using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_api_publabb2.Models;
using todo_api_publabb2.Services;

namespace todo_api_publabb2.Controllers
{
    [Route("todoapi")]
    [ApiController]
    public class SuperHeroController : ControllerBase
    {
        private ITodosAPI<Todo> _todo_service;

        public SuperHeroController(ITodosAPI<Todo> todoService)
        {
            _todo_service = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTodos()
        {
            var result = await _todo_service.GetAllTodos();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetSingleTodo(string id)
        {
            var result = await _todo_service.GetSingleTodo(id);
            if (result is null)
                return NotFound("Todo not found.");

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> AddTodo(TodoAPIData todo)
        {
            Todo NewTodo = new()
            {
                title = todo.title,
                content = todo.content,
                done = todo.done
            };
            var result = await _todo_service.AddTodo(NewTodo);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Todo>>> UpdateTodo(string id, Todo request)
        {
            var result = await _todo_service.UpdateTodo(id, request);
            if (result is null)
                return NotFound("Todo not found.");

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Todo>>> DeleteTodo(string id)
        {
            var result = await _todo_service.DeleteTodo(id);
            if (result is null)
                return NotFound("Todo not found.");

            return Ok(result);
        }
    }
}
