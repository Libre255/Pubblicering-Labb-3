output "logic-app-endpoint" {
  value = azurerm_logic_app_trigger_http_request.logic-app-request-endpoint.callback_url
}