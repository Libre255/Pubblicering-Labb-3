resource "azurerm_cosmosdb_account" "cosmos-account" {
  name                = "todo-cosmos-account-bv"
  resource_group_name = local.rg-name
  location            = local.rg-location
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = local.rg-location
    failover_priority = 0
  }

  depends_on = [azurerm_resource_group.rg-arkitektur-labb3]
}

resource "azurerm_cosmosdb_sql_database" "cosmos-db" {
  name                = "todo-cosmos-db-bv"
  resource_group_name = local.rg-name
  account_name        = azurerm_cosmosdb_account.cosmos-account.name

  depends_on = [azurerm_cosmosdb_account.cosmos-account]
}

resource "azurerm_cosmosdb_sql_container" "cosmos-container" {
  name                  = "todo-cosmos-container-bv"
  resource_group_name   = local.rg-name
  account_name          = azurerm_cosmosdb_account.cosmos-account.name
  database_name         = azurerm_cosmosdb_sql_database.cosmos-db.name
  partition_key_path    = "/id"
  partition_key_version = 1
  throughput            = 400

  depends_on = [azurerm_cosmosdb_sql_database.cosmos-db]
}