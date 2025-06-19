using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Requests
{
    public class TaskCreateRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }
        public bool Completed { get; set; } = false;
    }
}