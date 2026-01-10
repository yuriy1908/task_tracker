using Domain.Users;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Users
{
    public class UserContext(IHttpContextAccessor httpContextAccessor) : IUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

        public ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

        public int GetUserId()
        {
            if (User == null) throw new Exception("No HttpContext user found.");
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return userIdClaim == null ? throw new Exception("User ID claim not found") : int.Parse(userIdClaim);
        }
    }   
}
