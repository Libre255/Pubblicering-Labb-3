resource "azurerm_monitor_action_group" "application-budget" {
  name                = "todo-action-group-bv"
  resource_group_name = local.rg-name
  short_name          = "TAGBV"
  depends_on          = [azurerm_resource_group.rg-pubblicering-labb3]
}

resource "azurerm_consumption_budget_resource_group" "app-budget" {
  name              = "todo-app-budget-bv"
  resource_group_id = azurerm_resource_group.rg-pubblicering-labb3.id

  amount     = 1000
  time_grain = "Monthly"

  time_period {
    start_date = "2023-12-23T00:00:00Z"
    end_date   = "2024-12-23T00:00:00Z"
  }

  notification {
    enabled        = true
    threshold      = 80.0
    operator       = "EqualTo"
    threshold_type = "Forecasted"

    contact_emails = [
      "brian.gabriel.bartha.veliz@iths.se"
    ]

    contact_groups = [
      azurerm_monitor_action_group.application-budget.id,
    ]

    contact_roles = [
      "Owner",
    ]
  }

  depends_on = [azurerm_resource_group.rg-pubblicering-labb3]
}