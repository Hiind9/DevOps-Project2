resource "azurerm_lb" "internal_lb" {
  name                = "internal-lb"
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Standard"

  frontend_ip_configuration {
    name                          = "internal-lb-ip"
    subnet_id                     = var.subnet_id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_lb_backend_address_pool" "backend_pool" {
  loadbalancer_id = azurerm_lb.internal_lb.id
  name            = "backend-pool"
}

resource "azurerm_lb_backend_address_pool_address" "backend_addresses" {
  count                   = length(var.backend_vm_private_ips)
  name                    = "backend-address-${count.index}"
  backend_address_pool_id = azurerm_lb_backend_address_pool.backend_pool.id
  ip_address              = var.backend_vm_private_ips[count.index]
  virtual_network_id      = var.virtual_network_id
}

resource "azurerm_lb_probe" "lb_probe" {
  loadbalancer_id     = azurerm_lb.internal_lb.id
  name                = "http-probe"
  port                = 3000
  protocol            = "Http"
  request_path        = "/health"
  interval_in_seconds = 5
  number_of_probes    = 2
}

resource "azurerm_lb_rule" "lb_rule" {
  loadbalancer_id                = azurerm_lb.internal_lb.id
  name                           = "http-rule"
  protocol                       = "Tcp"
  frontend_port                  = 80
  backend_port                   = 80
  frontend_ip_configuration_name = azurerm_lb.internal_lb.frontend_ip_configuration[0].name
  backend_address_pool_ids       = [azurerm_lb_backend_address_pool.backend_pool.id]
  probe_id                       = azurerm_lb_probe.lb_probe.id
}
