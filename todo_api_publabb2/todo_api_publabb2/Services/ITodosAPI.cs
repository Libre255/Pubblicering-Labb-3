namespace todo_api_publabb2.Services
{
    public interface ITodosAPI<T>
    {
        Task<IEnumerable<Todo>> GetAllTodos();
        Task<Todo?> GetSingleTodo(string id);
        Task<Todo> AddTodo(Todo hero);
        Task<List<Todo>?> UpdateTodo(string id, Todo request);
        Task<List<Todo>?> DeleteTodo(string id);
    }
}
