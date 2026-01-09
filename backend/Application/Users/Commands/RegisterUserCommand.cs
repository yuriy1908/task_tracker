using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public record RegisterUserCommand(string Email, string Password) : IRequest<int>;

    public class RegisterUserCommandHandler(IUserRepository userRepository) : IRequestHandler<RegisterUserCommand, int>
    {
        public async Task<int> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {

            var user = new User
            {
                Email = request.Email,
                Password = request.Password
            };

            return await userRepository.Add(user, cancellationToken);
        }
    }
}
