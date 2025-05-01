variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "frontend_vm_ips" {
  type = list(string)
}

variable "nsg_id" {
  type = string
}