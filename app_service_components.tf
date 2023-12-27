resource "azurerm_service_plan" "sevice-plan" {
  name                = "todo-service-plan-bv"
  resource_group_name = local.rg-name
  location            = local.rg-location
  sku_name            = "S1"
  os_type             = "Linux"
  depends_on          = [azurerm_resource_group.rg-pubblicering-labb3]
}

resource "azurerm_linux_web_app" "webb-app" {
  name                = "todo-webb-app-bv"
  resource_group_name = local.rg-name
  location            = local.rg-location
  service_plan_id     = azurerm_service_plan.sevice-plan.id

  site_config {
    application_stack {
      dotnet_version = "7.0"
    }
  }

  #Database
  connection_string {
    name = "Database"
    type = "Custom"
    #this dubbel check if correct
    value = azurerm_cosmosdb_account.cosmos-account.primary_sql_connection_string
  }
  #Logic App
  app_settings = {
    LOGIC_APP_ENDPOINT = azurerm_logic_app_trigger_http_request.logic-app-request-endpoint.callback_url
  }

  depends_on = [azurerm_service_plan.sevice-plan, azurerm_cosmosdb_account.cosmos-account, azurerm_logic_app_trigger_http_request.logic-app-request-endpoint]
}

resource "azurerm_linux_web_app_slot" "webb-app-slot" {
  name           = "todo-webb-app-slot-bv"
  app_service_id = azurerm_linux_web_app.webb-app.id

  site_config {
    application_stack {
      dotnet_version = "7.0"
    }
  }

  depends_on = [azurerm_linux_web_app.webb-app]
}