using Microsoft.EntityFrameworkCore;
using Domain.ScheduleItems;
using Domain.Users;

namespace Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<ScheduleItem> ScheduleItems { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
