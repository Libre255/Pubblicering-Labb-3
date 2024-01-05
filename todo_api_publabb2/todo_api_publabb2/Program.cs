global using todo_api_publabb2.Models;
using todo_api_publabb2.Services;

var builder = WebApplication.CreateBuilder(args);
var CosmosENDPOINT = builder.Configuration.GetSection("COSMOSDB")["ENDPOINT"];
var CosmosKEY = builder.Configuration.GetSection("COSMOSDB")["KEY"];
var CosmosDATABASE = builder.Configuration.GetSection("COSMOSDB")["DATABASE"];
var CosmosCONTAINER = builder.Configuration.GetSection("COSMOSDB")["CONTAINER"];

string policyName = "ReacPolicy";
builder.Services.AddCors(policy =>
{
    policy.AddPolicy(name: policyName, p => {
        p.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

app.Run();
