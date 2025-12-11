using Domain.ScheduleItems;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ScheduleItems.Queries
{
    public record GetScheduleItemsQuery : IRequest<IEnumerable<ScheduleItemDto>>;

    public class GetScheduleItemsQueryHandler(IScheduleItemRepository scheduleItemRepository) 
        : IRequestHandler<GetScheduleItemsQuery, IEnumerable<ScheduleItemDto>>
    { 
        public async Task<IEnumerable<ScheduleItemDto>> Handle(GetScheduleItemsQuery request, CancellationToken cancellationToken)
        {
            return (await scheduleItemRepository.GetAll(cancellationToken)).Select(i => i.Map());
        }
    }
}
