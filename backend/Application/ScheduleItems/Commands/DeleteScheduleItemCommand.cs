using Domain.ScheduleItems;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ScheduleItems.Commands
{
    public record DeleteScheduleItemCommand(int Id) : IRequest;

    public class DeleteScheduleItemCommandHandler(IScheduleItemRepository scheduleItemRepository) : IRequestHandler<DeleteScheduleItemCommand>
    {
        public async Task Handle(DeleteScheduleItemCommand request, CancellationToken cancellationToken)
        {
            await scheduleItemRepository.Delete(request.Id, cancellationToken);
        }
    }
}
