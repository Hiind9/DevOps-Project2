output "frontend_vm_private_ips" {
  value = azurerm_network_interface.frontend_nics[*].private_ip_address
}

output "backend_vm_private_ips" {
  value = azurerm_network_interface.backend_nics[*].private_ip_address
}

output "backend_vm_nics" {
  value = azurerm_network_interface.backend_nics[*].id
}

output "public_vm_ips" {
  value = azurerm_public_ip.public_vm_ips[*].ip_address
}

output "tls_private_key" {
  description = "TLS private key for SSH access"
  value       = tls_private_key.vm_ssh.private_key_pem
  sensitive   = true
}