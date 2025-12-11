// Infrastructure/DesignTimeDbContextFactory.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        // 1. Создаем DbContextOptions
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // 2. Указываем провайдер БД (PostgreSQL)
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=task_tracker;Username=postgres;Password=12345");

        // 3. Возвращаем AppDbContext с этими настройками
        return new AppDbContext(optionsBuilder.Options);
    }
}