module "resource_group" {
  source   = "../modules/resource_group"
  name     = "DevOps2-Group1-App-RG"
  location = "UAE NORTH"
}

module "network" {
  source              = "../modules/network"
  resource_group_name = module.resource_group.name
  depends_on          = [module.resource_group]
  location            = module.resource_group.location
  vnet_name           = "Group1-App-Vnet"
  address_space       = ["10.0.0.0/16"]

  subnets = {
    frontend = {
      address_prefix = "10.0.1.0/24"
    }

    backend = {
      address_prefix    = "10.0.2.0/24"
      service_endpoints = ["Microsoft.Sql"]
    } # This will get Microsoft.Sql endpoint

    public = {
      address_prefix = "10.0.3.0/24"
    }

    appgateway = {
      address_prefix = "10.0.4.0/24"
    }
  }
}

module "nsg" {
  source              = "../modules/nsg"
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location

  rules = [
    {
      name                       = "AllowPort3000"
      priority                   = 100
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_port_range          = "*"
      destination_port_range     = "3000"
      source_address_prefix      = "*"
      destination_address_prefix = "*"
    }
  ]
}

module "sql" {
  source              = "../modules/sql"
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location
  server_name         = "group1-sql-server"
  db_name             = "Group1-App-DB"
  subnet_id           = module.network.subnet_ids["backend"]
  vnet_id             = module.network.vnet_id # Pass the VNet ID
}

module "vm" {
  source              = "../modules/vm"
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location

  frontend_subnet_id = module.network.subnet_ids["frontend"]
  backend_subnet_id  = module.network.subnet_ids["backend"]
  public_subnet_id   = module.network.subnet_ids["public"]

  frontend_vm_count = 2
  backend_vm_count  = 2
  public_vm_count   = 1

  admin_username = "azureuser"
  admin_password = "Group1-123123"
}

module "load_balancer" {
  source                 = "../modules/load_balancer"
  resource_group_name    = module.resource_group.name
  location               = module.resource_group.location
  subnet_id              = module.network.subnet_ids["backend"]
  backend_vm_nics        = module.vm.backend_vm_nics
  backend_vm_private_ips = module.vm.backend_vm_private_ips
  virtual_network_id     = module.network.vnet_id
  depends_on = [
    module.network,
    module.vm
  ]
}

module "app_gateway" {
  source              = "../modules/app_gateway"
  resource_group_name = module.resource_group.name
  location            = module.resource_group.location
  subnet_id           = module.network.subnet_ids["appgateway"]
  frontend_vm_ips     = module.vm.frontend_vm_private_ips
  nsg_id              = module.nsg.id
}

resource "azurerm_subnet_network_security_group_association" "appgw" {
  subnet_id                 = module.network.subnet_ids["appgateway"]
  network_security_group_id = module.nsg.id
}

resource "tls_private_key" "vm_ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}