using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using System.Net;

namespace todo_api_publabb2.Services
{
    public class TodoAPIService :ITodosAPI<Todo>
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

        public TodoAPIService(string CosmosENDPOINT, string CosmosKEY, string CosmosDATABASE, string CosmosCONTAINER)
        {
            CosmosClient client = new CosmosClient(accountEndpoint: CosmosENDPOINT, authKeyOrResourceToken: CosmosKEY, clientOptions: options);
            var database = client.GetDatabase(CosmosDATABASE);
            _context = database.GetContainer(CosmosCONTAINER);
        }

        public async Task<Todo> AddTodo(Todo _todo)
            {
            var response =  await _context.CreateItemAsync<Todo>(item: _todo, new PartitionKey(_todo.id.ToString()));

            return response.Resource;
        }

        public async Task<List<Todo>?> DeleteTodo(string id)
        {
            await _context.DeleteItemAsync<Todo>(id.ToString(), new PartitionKey(id.ToString()));
            var result = await GetAllTodos();
            return result.ToList();
        }

        public async Task<IEnumerable<Todo>> GetAllTodos()
        {
            var ItemsList = _context.GetItemLinqQueryable<Todo>();
            var iterator = ItemsList.ToFeedIterator();
            var results = await iterator.ReadNextAsync();
            
            return results;
        }

        public async Task<Todo?> GetSingleTodo(string id)
        {
            var response = await _context.ReadItemAsync<Todo>(id.ToString(), new PartitionKey(id.ToString()));

            return response.Resource;
        }

        public async Task<List<Todo>?> UpdateTodo(string id, Todo request)
        {
            List<PatchOperation> operations = new()
            {
                PatchOperation.Add("/title", request.title),
                PatchOperation.Add("/content", request.content),
                PatchOperation.Add("/done", request.done),
            };

            await _context.PatchItemAsync<Todo>(
                                id: id.ToString(),
                                partitionKey:new PartitionKey(id.ToString()),
                                patchOperations: operations
                                );
            
            var result = await GetAllTodos();
            return result.ToList();
        }
        
    }
}

