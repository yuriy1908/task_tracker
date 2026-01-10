using System.Security.Claims;

namespace Domain.Users
{
    public interface IUserContext
    {
        ClaimsPrincipal? User { get; }
        int GetUserId();
    }
}
