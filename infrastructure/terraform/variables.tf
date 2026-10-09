
variable "aws_region" {
  description = "AWS region for this project"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Prefix for project resources"
  type        = string
  default     = "dop-c02-sdlc"
}

variable "github_connection_arn" {
  description = "ARN of the AVAILABLE GitHub App connection"
  type        = string
}

variable "github_full_repository_id" {
  description = "GitHub repository in owner/repository format"
  type        = string
}

variable "github_branch" {
  description = "Branch used by the pipeline"
  type        = string
  default     = "main"
}