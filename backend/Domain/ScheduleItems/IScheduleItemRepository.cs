using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.ScheduleItems
{
    public interface IScheduleItemRepository
    {
        Task<ScheduleItem?> GetById(int id, CancellationToken cancellationToken);
        Task<IEnumerable<ScheduleItem>> GetAll(CancellationToken cancellationToken);
        Task<IEnumerable<ScheduleItem>> GetByUserId(int UserId, CancellationToken cancellationToken);
        Task<int> Add(ScheduleItem scheduleItem, CancellationToken cancellationToken);
        Task Update(ScheduleItem scheduleItem, CancellationToken cancellationToken);
        Task Delete(int id, CancellationToken cancellationToken);
    }
}
