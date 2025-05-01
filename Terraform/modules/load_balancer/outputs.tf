output "private_ip_address" {
  value = azurerm_lb.internal_lb.frontend_ip_configuration[0].private_ip_address
}

output "id" {
  value = azurerm_lb.internal_lb.id
}
