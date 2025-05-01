variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "frontend_subnet_id" {
  type = string
}

variable "backend_subnet_id" {
  type = string
}

variable "public_subnet_id" {
  type = string
}

variable "frontend_vm_count" {
  type    = number
  default = 2
}

variable "backend_vm_count" {
  type    = number
  default = 2
}

variable "public_vm_count" {
  type    = number
  default = 1
}

variable "admin_username" {
  type = string
}

variable "admin_password" {
  type = string
}