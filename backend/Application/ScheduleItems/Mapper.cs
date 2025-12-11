using Domain.ScheduleItems;

namespace Application.ScheduleItems
{
    public static class Mapper
    {
        public static ScheduleItemDto Map(this ScheduleItem group)
        {
            return new ScheduleItemDto() 
            { 
                Id = group.Id,
                Title = group.Title,
                Description = group.Description,
                StartTime = group.StartTime,
                EndTime = group.EndTime,
                Status = group.Status,
                UserId = group.UserId,
            };
        }
    }
}
