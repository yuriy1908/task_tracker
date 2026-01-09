using Application.ScheduleItems;
using Domain.ScheduleItems;
using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Queries
{
    public record GetUsersQuery() : IRequest<IEnumerable<UserDto>>;

    public class GetUsersQueryHandler(IUserRepository userRepository) : IRequestHandler<GetUsersQuery, IEnumerable<UserDto>>
    {
        public async Task<IEnumerable<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            return (await userRepository.GetAll(cancellationToken)).Select(u => u.Map());
        }
    }
}
