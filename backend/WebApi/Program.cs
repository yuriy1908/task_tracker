using Application;
using Domain.ScheduleItems;
using Domain.Users;
using Infrastructure.ScheduleItems;
using Infrastructure.Users;

namespace WebApi;


public class Programm
{
    public void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<IScheduleItemRepository, ScheduleItemRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AssemblyMarker).Assembly));
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}


//using Microsoft.EntityFrameworkCore;
//using StudentsBot.Students.Application;
//using StudentsBot.Students.Domain.Groups;
//using StudentsBot.Students.Domain.Students;
//using StudentsBot.Students.Infrastructure;
//using StudentsBot.Students.Infrastructure.Groups;
//using StudentsBot.Students.Infrastructure.Students;
//using StudentsBot.Students.Services;

//namespace StudentsBot.Students;

//public class Program
//{
//    public static void Main(string[] args)
//    {
//        var builder = WebApplication.CreateBuilder(args);

//        // Add services to the container.

//        builder.Services.AddControllers();

//        builder.Services.AddOpenApi();
//        builder.Services.AddDbContext<AppDbContext>(options =>
//            options.UseNpgsql(builder.Configuration.GetConnectionString("StudentDb")));
//        builder.Services.AddScoped<IStudentRepository, StudentRepository>();
//        builder.Services.AddScoped<IGroupRepository, GroupRepository>();
//        builder.Services.AddEndpointsApiExplorer();
//        builder.Services.AddSwaggerGen();
//        builder.Services.AddGrpc();
//        builder.Services.AddGrpcReflection();
//        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AssemblyMarker).Assembly));
//        var app = builder.Build();
//        app.MapGrpcService<GroupsService>();
//        app.MapGrpcReflectionService();

//        // Configure the HTTP request pipeline.
//        if (app.Environment.IsDevelopment())
//        {
//            app.MapOpenApi();
//        }

//        app.UseHttpsRedirection();

//        app.UseAuthorization();


//        app.MapControllers();

//        app.UseSwagger();
//        app.UseSwaggerUI();
//        app.Run();
//    }
//}