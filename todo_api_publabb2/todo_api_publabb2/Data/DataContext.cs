global using Microsoft.EntityFrameworkCore;

namespace todo_api_publabb2.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Todo> Todos { get; set; }

        private readonly IConfiguration _configuration;
        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var cosmosEndPoint = _configuration["cosmos-kv-endpoint-bv"];
            var cosmosPrimaryKey = _configuration["cosmos-kv-pk-bv"];
            var cosmosDatabaseName = _configuration["cosmos-kv-db-name-bv"];
            optionsBuilder.UseCosmos(cosmosEndPoint, cosmosPrimaryKey, cosmosDatabaseName);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>()
                        .ToContainer("todo-cosmos-container-bv")
                        .HasPartitionKey(c => c.id);
        }

    }
}
