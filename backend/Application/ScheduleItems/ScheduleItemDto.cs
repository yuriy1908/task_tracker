using Domain.ScheduleItems;
using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ScheduleItems
{
    public class ScheduleItemDto
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public bool IsImportant { get; set; }

        public ScheduleItemStatus? Status { get; set; }
        public string StatusDisplayName { get; set; }

        public TimeSpan? Duration =>
            (StartTime.HasValue && EndTime.HasValue)
                ? EndTime.Value - StartTime.Value
                : (TimeSpan?)null;

        public int UserId { get; set; }
    }
}
