#Office365 API connection
data "azurerm_managed_api" "office365-api" {
  name     = "office365"
  location = local.rg-location
}

resource "azurerm_api_connection" "office365" {
  name                = "office365-bv"
  resource_group_name = local.rg-name
  managed_api_id      = data.azurerm_managed_api.office365-api.id
  display_name        = var.office365-account-name

  lifecycle {
    ignore_changes = [parameter_values]
  }
  depends_on = [azurerm_resource_group.rg-pubblicering-labb3]
}
#Logic App Workflow
resource "azurerm_logic_app_workflow" "logic-app-workflow" {
  name                = "logic-app-workflow-bv"
  location            = local.rg-location
  resource_group_name = local.rg-name

  parameters = {
    "$connections" = jsonencode({
      office365 = {
        connectionId         = azurerm_api_connection.office365.id
        connectionName       = azurerm_api_connection.office365.name
        connectionProperties = {}
        id                   = data.azurerm_managed_api.office365-api.id
      }
    })
  }
  workflow_parameters = {
    "$connections" = jsonencode({
      defaultValue = {}
      type         = "Object"
    })
  }

  depends_on = [azurerm_resource_group.rg-pubblicering-labb3]
}

resource "azurerm_logic_app_trigger_http_request" "logic-app-request-endpoint" {
  name         = "logic-app-request-endpoint-bv"
  logic_app_id = azurerm_logic_app_workflow.logic-app-workflow.id

  schema     = <<SCHEMA
{
  "type": "Request",
  "kind": "Http",
  "inputs": {
    "schema": {
      "type": "object",
      "properties": {
        "userEmail": {
          "type": "string"
        },
        "TodosList": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "done": {
                "type": "boolean"
              }
            },
            "required": ["id", "title", "content", "done"]
          }
        }
      }
    }
  }
}
SCHEMA
  depends_on = [azurerm_logic_app_workflow.logic-app-workflow]
}

resource "azurerm_logic_app_action_custom" "read-http-reponse" {
  name         = "read-http-reponse-bv"
  logic_app_id = azurerm_logic_app_workflow.logic-app-workflow.id
  body         = <<BODY
 {
  "runAfter": {},
  "type": "ParseJson",
  "description": "Read the HTTP response and make it into a Logic App code so it can be used with functions",
  "inputs": {
    "content": "@triggerBody()",
    "schema": {
      "type": "object",
      "properties": {
        "userEmail": {
          "type": "string"
        },
        "TodosList": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "done": {
                "type": "boolean"
              }
            },
            "required": ["id", "title", "content", "done"]
          }
        }
      }
    }
  }
}
 BODY
  depends_on   = [azurerm_logic_app_trigger_http_request.logic-app-request-endpoint]
}

resource "azurerm_logic_app_action_custom" "email-message-variable" {
  name         = "email-message-variable-bv"
  logic_app_id = azurerm_logic_app_workflow.logic-app-workflow.id

  body = <<BODY
  {
  "runAfter": {
    "read-http-reponse-bv": ["Succeeded"]
  },
  "type": "InitializeVariable",
  "description": "Variable that will contain the content of the email",
  "inputs": {
    "variables": [
      {
        "name": "emailContent",
        "type": "string"
      }
    ]
  }
}
 BODY

  depends_on = [azurerm_logic_app_action_custom.read-http-reponse]
}

resource "azurerm_logic_app_action_custom" "todo-list-concat-format" {
  name         = "todo-list-concat-format-bv"
  logic_app_id = azurerm_logic_app_workflow.logic-app-workflow.id

  body = <<BODY
  {
    "foreach": "@body('read-http-reponse-bv')?['TodoList']",
    "actions": {
      "Append_to_string_variable": {
        "type": "AppendToStringVariable",
        "inputs": {
          "name": "emailContent",
          "value": "@concat('Title: ', item()?['title'], '<br/>Content:<br/>', item()?['content'], '<br/>Done: ', item()?['done'])"
        }
      }
    },
    "runAfter": {
      "email-message-variable-bv": ["Succeeded"]
    },
    "type": "Foreach"
  }
 BODY

  depends_on = [azurerm_logic_app_action_custom.email-message-variable]
}

resource "azurerm_logic_app_action_custom" "send-email-to-user" {
  name         = "send-email-to-user-bv"
  logic_app_id = azurerm_logic_app_workflow.logic-app-workflow.id

  body = <<BODY
{
  "runAfter": {
    "todo-list-concat-format-bv": ["Succeeded"]
  },
  "type": "ApiConnection",
  "inputs": {
    "host": {
      "connection": {
        "name": "@parameters('$connections')['office365']['connectionId']"
      }
    },
    "method": "post",
    "body": {
      "To": "@triggerBody()?['userEmail']",
      "Subject": "Order of todo list",
      "Body": "<p>Here is the list of your todos</p><br><p>@{variables('emailContent')}</p>",
      "Importance": "Normal"
    },
    "path": "/v2/Mail"
  }
}
 BODY

  depends_on = [azurerm_logic_app_action_custom.todo-list-concat-format]
}