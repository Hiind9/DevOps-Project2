output "public_vm_ip_address" {
  description = "Public IP address of the bastion VM"
  value       = module.vm.public_vm_ips
}

output "frontend_vm_private_ips" {
  description = "Private IP addresses of the frontend VMs"
  value       = module.vm.frontend_vm_private_ips
}

output "backend_vm_private_ips" {
  description = "Private IP addresses of the backend VMs"
  value       = module.vm.backend_vm_private_ips
}

output "tls_private_key" {
  description = "TLS private key for SSH access"
  value       = module.vm.tls_private_key
  sensitive   = true
}