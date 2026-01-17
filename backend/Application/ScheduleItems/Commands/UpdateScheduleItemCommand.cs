using Domain.ScheduleItems;
using MediatR;

namespace Application.ScheduleItems.Commands
{
    public record UpdateScheduleItemCommand(
        int Id, 
        string Title,
        string Description,
        bool IsImportant,
        DateTime StartTime,
        DateTime EndTime,
        ScheduleItemStatus Status) : IRequest;

    public class UpdateScheduleItemCommandHandler(IScheduleItemRepository scheduleItemRepository) : IRequestHandler<UpdateScheduleItemCommand>
    {
        public async Task Handle(UpdateScheduleItemCommand request, CancellationToken cancellationToken)
        {
            var scheduleItem = await scheduleItemRepository.GetById(request.Id, cancellationToken);
            if (scheduleItem == null)
            {
                throw new Exception("Not found scheduleItem");
            }

            if (request.Title != null) 
                scheduleItem.Title = request.Title;

            if (request.Description != null) 
                scheduleItem.Description = request.Description;

            scheduleItem.IsImportant = request.IsImportant;

            if (request.StartTime != default) 
                scheduleItem.StartTime = request.StartTime;

            if (request.EndTime != default) 
                scheduleItem.EndTime = request.EndTime;
            
            if (scheduleItem.Status != null)
                scheduleItem.Status = request.Status;

            await scheduleItemRepository.Update(scheduleItem, cancellationToken);
        }
    }
}
