
output "aws_region" {
  value = var.aws_region
}

output "artifact_bucket_name" {
  value = aws_s3_bucket.artifacts.bucket
}

output "ecr_repository_url" {
  value = aws_ecr_repository.website.repository_url
}

output "codebuild_project_name" {
  value = aws_codebuild_project.website.name
}

output "codepipeline_name" {
  value = aws_codepipeline.website.name
}