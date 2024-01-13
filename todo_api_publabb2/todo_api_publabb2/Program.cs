global using todo_api_publabb2.Models;
using todo_api_publabb2.Services;

DotNetEnv.Env.Load();
var CosmosKEY = Environment.GetEnvironmentVariable("KEY");
var CosmosDATABASE = Environment.GetEnvironmentVariable("DATABASE");
var CosmosCONTAINER = Environment.GetEnvironmentVariable("CONTAINER");
var CosmosENDPOINT = Environment.GetEnvironmentVariable("ENDPOINT");

var builder = WebApplication.CreateBuilder(args);

string policyName = "ReactPolicy";
builder.Services.AddCors(policy =>
{
    policy.AddPolicy(name: policyName, p => {
        p.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITodosAPI<Todo>>(x => {
return new TodoAPIService(CosmosENDPOINT, CosmosKEY, CosmosDATABASE, CosmosCONTAINER);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors(policyName);
app.UseAuthorization();
app.MapControllers();

MockData MockDataContainer = new(CosmosENDPOINT, CosmosKEY, CosmosDATABASE, CosmosCONTAINER);
await MockDataContainer.AddMockData();

app.Run();
