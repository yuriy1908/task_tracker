using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Queries
{
    public record GetUserByNameQuery(string Name) : IRequest<UserDto>;

    public class GetUserByNameQueryHandler(IUserRepository userRepository) : IRequestHandler<GetUserByNameQuery, UserDto>
    {
        public async Task<UserDto> Handle(GetUserByNameQuery request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByName(request.Name, cancellationToken);
            if (user != null)
                return user.Map();
            throw new Exception("Not found user");
        }
    }
}
