using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MediatR;
using Domain.ScheduleItems;
using Domain.Users;

namespace Application.ScheduleItems.Commands
{
    public record CreateScheduleItemCommand(
        string Title,
        string Description,
        DateTime StartTime,
        DateTime EndTime,
        bool IsImportant,
        ScheduleItemStatus Status) : IRequest<ScheduleItem>;

    public class CreateScheduleItemCommandHandler(IScheduleItemRepository scheduleItemRepository, IUserContext userContext)
        : IRequestHandler<CreateScheduleItemCommand, ScheduleItem>
    {
        public async Task<ScheduleItem> Handle(CreateScheduleItemCommand request, CancellationToken cancellationToken)
        {
            var scheduleItem = new ScheduleItem 
            { 
                Title = request.Title,
                Description = request.Description,
                StartTime = DateTime.SpecifyKind(request.StartTime, DateTimeKind.Utc),
                EndTime = DateTime.SpecifyKind(request.EndTime, DateTimeKind.Utc),
                UserId = userContext.GetUserId(),
                IsImportant = request.IsImportant,
                Status = request.Status,
            };

            return await scheduleItemRepository.Add(scheduleItem, cancellationToken);
        }
    }
}
