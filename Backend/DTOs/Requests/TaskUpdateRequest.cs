using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Requests
{
    public class TaskUpdateRequest
    {
        [StringLength(100, MinimumLength = 3)]
        public string? Title { get; set; }

        public string? Description { get; set; }
        public bool? Completed { get; set; }
    }
}