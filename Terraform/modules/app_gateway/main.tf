resource "azurerm_public_ip" "agw_pip" {
  name                = "agw-pip"
  resource_group_name = var.resource_group_name
  location            = var.location
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_application_gateway" "agw" {
  name                = "Group1-App-Gateway"
  resource_group_name = var.resource_group_name
  location            = var.location

  sku {
    name     = "Standard_v2"
    tier     = "Standard_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "AppGatewayIpConfig"
    subnet_id = var.subnet_id
  }

  frontend_port {
    name = "http-port"
    port = 80
  }

  frontend_ip_configuration {
    name                 = "AppGatewayFrontendIP"
    public_ip_address_id = azurerm_public_ip.agw_pip.id
  }

  backend_address_pool {
    name         = "frontend-pool"
    ip_addresses = var.frontend_vm_ips
  }

  backend_http_settings {
    name                  = "frontend-http-settings"
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 60
  }

  http_listener {
    name                           = "http-listener"
    frontend_ip_configuration_name = "appGatewayFrontendIP"
    frontend_port_name             = "http-port"
    protocol                       = "Http"
  }

  request_routing_rule {
    name                       = "frontend-route"
    rule_type                  = "Basic"
    priority                   = 100 
    http_listener_name         = "http-listener"
    backend_address_pool_name  = "frontend-pool"
    backend_http_settings_name = "frontend-http-settings"
  }
}