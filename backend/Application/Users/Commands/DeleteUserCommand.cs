using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public record DeleteUserCommand(int Id) : IRequest;

    public class DeleteUserCommandHandler(IUserRepository userRepository) : IRequestHandler<DeleteUserCommand>
    {
        public async Task Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            await userRepository.Delete(request.Id, cancellationToken);
        }
    }
}
