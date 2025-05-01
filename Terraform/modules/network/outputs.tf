output "vnet_id" {
  value = azurerm_virtual_network.virtual_network.id
}

output "subnet_ids" {
  value = { for k, v in azurerm_subnet.subnets : k => v.id }
}