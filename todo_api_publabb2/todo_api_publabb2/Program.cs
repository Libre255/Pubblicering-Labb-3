global using todo_api_publabb2.Models;
using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using Microsoft.Extensions.Options;
using todo_api_publabb2.Data;
using todo_api_publabb2.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITodosAPI, TodoAPIService>();


var keyvault_URL = builder.Configuration.GetSection("key_vault:KEY_VAULT_URL");
var keyVaultClient = new KeyVaultClient(
                            new KeyVaultClient.AuthenticationCallback(
                                 new AzureServiceTokenProvider().KeyVaultTokenCallback));

builder.Configuration.AddAzureKeyVault(new Uri(keyvault_URL.Value!.ToString()), new DefaultAzureCredential());

var client = new SecretClient(new Uri(keyvault_URL.Value!.ToString()), new DefaultAzureCredential());
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseCosmos(client.GetSecret("cosmos-kv-endpoint-bv").Value.Value.ToString(), client.GetSecret("cosmos-kv-pk-bv").Value.Value.ToString(), client.GetSecret("cosmos-kv-db-name-bv").Value.Value.ToString());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
