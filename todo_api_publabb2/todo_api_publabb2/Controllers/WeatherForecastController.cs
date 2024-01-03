using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using static System.Net.WebRequestMethods;
using Container = Microsoft.Azure.Cosmos.Container;

namespace todo_api_publabb2.Controllers
{
    [ApiController]
    [Route("/")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[HttpGet(Name = "GetWeatherForecast")]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        //        TemperatureC = Random.Shared.Next(-20, 55),
        //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}

        [HttpGet(Name = "test")]
        public async Task<ActionResult<List<Object>>> Get()
        {
            var cs = "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
            
            CosmosClientOptions options = new()
            {
                HttpClientFactory = () => new HttpClient(new HttpClientHandler()
                {
                    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                }),
                ConnectionMode = ConnectionMode.Gateway,
                LimitToEndpoint = true
            };
            var client = new CosmosClient(accountEndpoint: "https://localhost:8081", authKeyOrResourceToken: "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==", clientOptions:options);
            var database = client.GetDatabase("todo-cosmos-db-bv");
            Container _context = database.GetContainer("todo-cosmos-container-bv");

            //var query = new QueryDefinition("SELECT * FROM testcontainer");
            var q = _context.GetItemLinqQueryable<Todo>();
            var iterator = q.ToFeedIterator();
            var results = await iterator.ReadNextAsync();

            return Ok(results);
        }
    }
}