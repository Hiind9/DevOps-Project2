resource "azurerm_mssql_server" "sql_server" {
  name                         = var.server_name
  resource_group_name          = var.resource_group_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = "azureuser"
  administrator_login_password = "Group1-123123" 
}

resource "azurerm_mssql_virtual_network_rule" "sql_vnet_rule" {
  name      = "${var.server_name}-vnet-rule"
  server_id = azurerm_mssql_server.sql_server.id
  subnet_id = var.subnet_id  # The backend subnet where your VMs reside
}

resource "azurerm_mssql_database" "db" {
  name           = var.db_name
  server_id      = azurerm_mssql_server.sql_server.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  sku_name       = "S0"
  zone_redundant = false
}

resource "azurerm_private_endpoint" "sql_pe" {
  name                = "${var.server_name}-pe"
  resource_group_name = var.resource_group_name
  location            = var.location
  subnet_id           = var.subnet_id

  private_service_connection {
    name                           = "${var.server_name}-psc"
    private_connection_resource_id = azurerm_mssql_server.sql_server.id
    subresource_names              = ["sqlServer"]
    is_manual_connection           = false
  }


  # Automatically create DNS record in Azure Private DNS
  private_dns_zone_group {
    name                 = "default"
    private_dns_zone_ids = [azurerm_private_dns_zone.sql_dns_zone.id]
  }
}

# Private DNS Zone (NEW)
resource "azurerm_private_dns_zone" "sql_dns_zone" {
  name                = "privatelink.database.windows.net"
  resource_group_name = var.resource_group_name
}

# Link DNS Zone to VNet (NEW)
resource "azurerm_private_dns_zone_virtual_network_link" "dns_link" {
  name                  = "${var.server_name}-dns-link"
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.sql_dns_zone.name
  virtual_network_id    = var.vnet_id  # Need to add this variable
}