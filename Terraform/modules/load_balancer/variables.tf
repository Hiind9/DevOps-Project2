variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "backend_vm_nics" {
  description = "List of NIC IDs for backend VMs"
  type        = list(string)
}

variable "backend_vm_private_ips" {
  type = list(string)
}

variable "virtual_network_id" {
  type        = string
  description = "ID of the virtual network for the load balancer"
}