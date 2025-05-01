variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "vnet_name" {
  type = string
}

variable "address_space" {
  type = list(string)
}

variable "subnets" {
  type = map(object({
    address_prefix  = string
    service_endpoints = optional(list(string), [])
  }))
}

variable "subnet_service_endpoints" {
  type = map(list(string))
  default = {
    "backend" = ["Microsoft.Sql"]  # Default endpoints for backend subnet
  }
  description = "Service endpoints to enable on each subnet"
}