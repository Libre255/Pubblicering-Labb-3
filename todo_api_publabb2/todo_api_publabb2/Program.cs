global using todo_api_publabb2.Models;
using Azure.Identity;
using todo_api_publabb2.Data;
using todo_api_publabb2.Services;

var builder = WebApplication.CreateBuilder(args);

string keyvaultendpoint = builder.Configuration["KEY_VAULT_END_POINT"];
builder.Configuration.AddAzureKeyVault(new Uri(keyvaultendpoint), new DefaultAzureCredential());

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITodosAPI, TodoAPIService>();
builder.Services.AddDbContext<DataContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
