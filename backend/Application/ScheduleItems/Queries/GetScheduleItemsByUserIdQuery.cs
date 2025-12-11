using Domain.ScheduleItems;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ScheduleItems.Queries
{
    public record GetScheduleItemsByUserIdQuery(int UserId) : IRequest<IEnumerable<ScheduleItemDto>>;

    public class GetScheduleItemsByUserIdQueryHandler(IScheduleItemRepository scheduleItemRepository) 
        : IRequestHandler<GetScheduleItemsByUserIdQuery, IEnumerable<ScheduleItemDto>>
    {
        public async Task<IEnumerable<ScheduleItemDto>> Handle(GetScheduleItemsByUserIdQuery request, CancellationToken cancellationToken)
        {
            return (await scheduleItemRepository.GetByUserId(request.UserId, cancellationToken)).Select(i => i.Map());
        }
    }
}
