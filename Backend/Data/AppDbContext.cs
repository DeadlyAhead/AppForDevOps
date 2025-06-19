using Microsoft.EntityFrameworkCore;
using Backend.Models;
using MyTask = Backend.Models.Task;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<MyTask> Tasks => Set<MyTask>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Task>()
                .Property(t => t.UpdatedAt)
                .HasDefaultValue(null)
                .ValueGeneratedOnAddOrUpdate();
        }
    }


}