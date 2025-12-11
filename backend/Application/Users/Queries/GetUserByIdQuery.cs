using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Queries
{
    public record GetUserByIdQuery(int Id) : IRequest<UserDto>;

    public class GetUserByIdQueryHandler(IUserRepository userRepository) : IRequestHandler<GetUserByIdQuery, UserDto>
    { 
        public async Task<UserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetById(request.Id, cancellationToken);
            if (user != null)
                return user.Map();
            throw new Exception("Not found user");
        }
    }

}
