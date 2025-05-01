variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "server_name" {
  type = string
}

variable "db_name" {
  type = string
}

variable "subnet_id" {
  type = string
}

#VNet ID for DNS integration
variable "vnet_id" {
  type = string
}
