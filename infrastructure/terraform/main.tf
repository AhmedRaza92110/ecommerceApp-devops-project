
data "aws_caller_identity" "current" {}

resource "random_id" "suffix" {
  byte_length = 4
}

# Pipeline artifact storage
resource "aws_s3_bucket" "artifacts" {
  bucket = "${var.project_name}-artifacts-${data.aws_caller_identity.current.account_id}-${random_id.suffix.hex}"

  force_destroy = false

  tags = {
    Project   = var.project_name
    ManagedBy = "Terraform"
    Purpose   = "CodePipeline artifacts"
  }
}

resource "aws_s3_bucket_versioning" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ECR is prepared for the later Docker build stage.
resource "aws_ecr_repository" "website" {
  name                 = "${var.project_name}/website"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}

resource "aws_ecr_lifecycle_policy" "website" {
  repository = aws_ecr_repository.website.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep only the latest 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# CodeBuild execution role
resource "aws_iam_role" "codebuild" {
  name = "${var.project_name}-codebuild-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "codebuild.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codebuild" {
  name = "${var.project_name}-codebuild-policy"
  role = aws_iam_role.codebuild.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetBucketLocation",
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.artifacts.arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject",
          "s3:AbortMultipartUpload"
        ]
        Resource = "${aws_s3_bucket.artifacts.arn}/*"
      }
    ]
  })
}

# CodePipeline execution role
resource "aws_iam_role" "codepipeline" {
  name = "${var.project_name}-codepipeline-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "codepipeline.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codepipeline" {
  name = "${var.project_name}-codepipeline-policy"
  role = aws_iam_role.codepipeline.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetBucketLocation",
          "s3:GetBucketVersioning",
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.artifacts.arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload"
        ]
        Resource = "${aws_s3_bucket.artifacts.arn}/*"
      },
      {
        Effect = "Allow"
        Action = [
          "codebuild:StartBuild",
          "codebuild:BatchGetBuilds"
        ]
        Resource = aws_codebuild_project.website.arn
      },
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole"
        ]
        Resource = aws_iam_role.codebuild.arn
        Condition = {
          StringEquals = {
            "iam:PassedToService" = ["codebuild.amazonaws.com"]
          }
        }
      },
      {
        Effect = "Allow"
        Action = [
          "codeconnections:UseConnection",
          "codestar-connections:UseConnection"
        ]
        Resource = var.github_connection_arn
      }
    ]
  })
}


# CodeBuild project: npm install, tests, Next.js production build
resource "aws_codebuild_project" "website" {
  name          = "${var.project_name}-build"
  description   = "Test and build the existing Next.js website"
  service_role  = aws_iam_role.codebuild.arn
  build_timeout = 15

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:7.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }

  logs_config {
    cloudwatch_logs {
      status = "ENABLED"
    }
  }

  tags = {
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}

# GitHub -> CodeBuild pipeline
resource "aws_codepipeline" "website" {
  name           = "${var.project_name}-pipeline"
  role_arn       = aws_iam_role.codepipeline.arn
  pipeline_type  = "V2"
  execution_mode = "SUPERSEDED"

  artifact_store {
    location = aws_s3_bucket.artifacts.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "GitHubSource"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["SourceArtifact"]

      configuration = {
        ConnectionArn    = var.github_connection_arn
        FullRepositoryId = var.github_full_repository_id
        BranchName       = var.github_branch
        DetectChanges    = "true"
      }
    }
  }

  stage {
    name = "BuildAndTest"

    action {
      name             = "BuildWebsite"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["SourceArtifact"]
      output_artifacts = ["BuildArtifact"]

      configuration = {
        ProjectName = aws_codebuild_project.website.name
      }
    }
  }

  depends_on = [
    aws_iam_role_policy.codepipeline,
    aws_iam_role_policy.codebuild
  ]

  tags = {
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}