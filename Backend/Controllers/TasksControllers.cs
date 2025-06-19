using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.DTOs.Requests;
using Backend.DTOs.Responses;



namespace Backend.Controllers
{
    [Route("api/openapi/v1/tasks")]
    [ApiController]
    public class TasksController : ControllerBase  // Исправлено на TasksController (множ. число)
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/openapi/v1/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskResponse>>> GetTasks([FromQuery] bool? completed)
        {
            IQueryable<Models.Task> query = _context.Tasks;

            if (completed.HasValue)
            {
                query = query.Where(t => t.Completed == completed.Value);
            }

            return await query
            .Select(t => new TaskResponse
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Completed = t.Completed,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt
                })
                .ToListAsync();
        }

        // GET: api/openapi/v1/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskResponse>> GetTask(long id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new { code = 404, message = "Task not found" });
            }

            return new TaskResponse
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Completed = task.Completed,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };
        }

        // POST: api/openapi/v1/tasks
        [HttpPost]
        public async Task<ActionResult<TaskResponse>> PostTask([FromBody] TaskCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = new Models.Task
            {
                Title = request.Title,
                Description = request.Description,
                Completed = request.Completed
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id },
            new TaskResponse
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    Completed = task.Completed,
                    CreatedAt = task.CreatedAt,
                    UpdatedAt = task.UpdatedAt
                });
        }

        // PATCH: api/openapi/v1/tasks/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchTask(long id, [FromBody] TaskUpdateRequest request)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound(new { code = 404, message = "Task not found" });
            }
            if (request.Title != null)
                task.Title = request.Title;

            if (request.Description != null)
                task.Description = request.Description;

            if (request.Completed.HasValue)
                task.Completed = request.Completed.Value;

            task.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new TaskResponse
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Completed = task.Completed,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            });
        }

        // DELETE: api/openapi/v1/tasks/5
        [HttpDelete("{id}")] 
        public async Task<IActionResult> DeleteTask(long id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound(new { code = 404, message = "Task not found" });
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(long id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}