resource "azurerm_virtual_network" "virtual_network" {
  name                = var.vnet_name
  resource_group_name = var.resource_group_name
  location            = var.location
  address_space       = var.address_space
}


resource "azurerm_subnet" "subnets" {
  for_each             = var.subnets
  name                 = each.key
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.virtual_network.name
  address_prefixes     = [each.value.address_prefix]
    # Add service endpoints if defined for this subnet
  service_endpoints = lookup(each.value, "service_endpoints", [])
}