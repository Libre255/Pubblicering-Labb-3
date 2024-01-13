using Microsoft.Azure.Cosmos;
using System.Net;

namespace todo_api_publabb2.Services
{
    public class MockData
    {
        private Container _context;
        CosmosClientOptions options = new()
        {
            HttpClientFactory = () => new HttpClient(new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            }),
            ConnectionMode = ConnectionMode.Gateway,
            LimitToEndpoint = true
        };

        public MockData(string CosmosENDPOINT, string CosmosKEY, string CosmosDATABASE, string CosmosCONTAINER)
        {
            CosmosClient client = new CosmosClient(accountEndpoint: CosmosENDPOINT, authKeyOrResourceToken: CosmosKEY, clientOptions: options);
            var database = client.GetDatabase(CosmosDATABASE);
            _context = database.GetContainer(CosmosCONTAINER);
        }

        public async Task AddMockData()
        {
            List<Todo> SeedTodo = new()
            {
                new Todo{id = "1", content = "First Todo", title = "The One", done = true },
                new Todo{id = "2", content = "Second Todo", title = "The Second", done = true },
                new Todo{id = "3", content = "Third Todo", title = "The Third", done = true }
            };
            foreach (Todo T in SeedTodo)
            {
                try
                {
                    var recipeResponse = await _context.ReadItemAsync<Todo>(T.id, new PartitionKey(T.id));
                    Console.WriteLine($"Item id {recipeResponse.Resource.id} already exists");
                }
                catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
                {
                    await _context.CreateItemAsync<Todo>(item: T, new PartitionKey(T.id));

                }
            }
        }
    }
}
