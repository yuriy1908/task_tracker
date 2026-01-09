using Domain.Users;
using MediatR;

namespace Application.Users.Queries
{
    public record GetUserByEmailQuery(string Email) : IRequest<UserDto>;

    public class GetUserByEmailQueryHandler(IUserRepository userRepository) : IRequestHandler<GetUserByEmailQuery, UserDto>
    {
        public async Task<UserDto> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByEmail(request.Email, cancellationToken);
            if (user != null)
                return user.Map();
            throw new Exception("Not found user");
        }
    }
}
