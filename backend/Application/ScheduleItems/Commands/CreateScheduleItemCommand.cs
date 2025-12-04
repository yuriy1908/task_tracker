using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MediatR;
using Domain.ScheduleItems;

namespace Application.ScheduleItems.Commands
{
    public record CreateScheduleItemCommand(
        string Title,
        string Description,
        DateTime StartTime,
        DateTime EndTime,
        int UserId,
        ScheduleItemStatus Status) : IRequest<int>;

    public class CreateScheduleItemCommandHandler(IScheduleItemRepository scheduleItemRepository) : IRequestHandler<CreateScheduleItemCommand, int>
    {
        public async Task<int> Handle(CreateScheduleItemCommand request, CancellationToken cancellationToken)
        {
            var scheduleItem = new ScheduleItem 
            { 
                Title = request.Title,
                Description = request.Description,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                UserId = request.UserId,
                Status = request.Status,
            };

            return await scheduleItemRepository.Add(scheduleItem, cancellationToken);
        }
    }
}
