using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public record UpdateUserCommand(int Id, string Name, string Email, string Password) : IRequest;

    public class UpdateUserCommandHandler(IUserRepository userRepository) : IRequestHandler<UpdateUserCommand>
    {
        public async Task Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetById(request.Id, cancellationToken);

            if (user == null)
                throw new Exception("User not found");

            if (request.Name !=  null) 
                user.Name = request.Name;

            if (request.Email != null)
                user.Email = request.Email;

            if (request.Password != null)
                user.Password = request.Password;

            await userRepository.Update(user, cancellationToken);
        }
    }
}
