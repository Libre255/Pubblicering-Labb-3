terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.73.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg-arkitektur-labb3" {
  name     = "rg-arkitektur-labb3-bv"
  location = "West Europe"
}

locals {
  rg-name     = azurerm_resource_group.rg-arkitektur-labb3
  rg-location = azurerm_resource_group.rg-arkitektur-labb3.location
}