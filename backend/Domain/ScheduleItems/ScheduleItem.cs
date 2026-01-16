using Domain.Users;
namespace Domain.ScheduleItems
{
    public class ScheduleItem : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public ScheduleItemStatus? Status { get; set; }
        public bool IsImportant { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
