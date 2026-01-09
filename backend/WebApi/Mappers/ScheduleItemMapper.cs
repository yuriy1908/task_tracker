using Application.ScheduleItems;
using Domain.ScheduleItems;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Text.RegularExpressions;

namespace WebApi.Mappers
{
    public static class ScheduleItemMapper
    {
        public static ScheduleItem Map(this ScheduleItemDto scheduleItemDto)
        {
            return new ScheduleItem()
            {
                Id = scheduleItemDto.Id,
                Title = scheduleItemDto.Title,
                Description = scheduleItemDto.Description,
                StartTime = scheduleItemDto.StartTime,
                EndTime = scheduleItemDto.EndTime,
                Status = scheduleItemDto.Status,
                UserId = scheduleItemDto.UserId,
            };
        }

        public static IEnumerable<ScheduleItem> Map(this IEnumerable<ScheduleItemDto> scheduleItems)
        {
            return scheduleItems.Select(x => x.Map());
        }
    }
}
