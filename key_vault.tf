data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "key-vault" {
  name                        = "key-vault-bv"
  location                    = local.rg-location
  resource_group_name         = local.rg-name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Set",
      "Get",
      "Delete",
      "Purge",
      "Recover"
    ]
  }
  depends_on = [azurerm_resource_group.rg-pubblicering-labb3]
}

resource "azurerm_key_vault_secret" "cosmos-kv-endpoint" {
  name         = "cosmos-kv-endpoint-bv"
  value        = azurerm_cosmosdb_account.cosmos-account.endpoint
  key_vault_id = azurerm_key_vault.key-vault.id
  depends_on   = [azurerm_key_vault.key-vault]
}

resource "azurerm_key_vault_secret" "cosmos-kv-pk" {
  name         = "cosmos-kv-pk-bv"
  value        = azurerm_cosmosdb_account.cosmos-account.primary_key
  key_vault_id = azurerm_key_vault.key-vault.id
  depends_on   = [azurerm_key_vault.key-vault]
}

resource "azurerm_key_vault_secret" "cosmos-kv-db-name" {
  name         = "cosmos-kv-db-name-bv"
  value        = azurerm_cosmosdb_sql_database.cosmos-db.name
  key_vault_id = azurerm_key_vault.key-vault.id
  depends_on   = [azurerm_key_vault.key-vault]
}