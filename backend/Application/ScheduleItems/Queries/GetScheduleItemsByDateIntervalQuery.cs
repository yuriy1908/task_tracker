using Application.ScheduleItems;
using Domain.ScheduleItems;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ScheduleItems.Queries
{
    public record GetScheduleItemsByDateIntervalQuery(int UserId, DateTime DateStart, DateTime DateEnd) : IRequest<IEnumerable<ScheduleItemDto>>;

    public class GetScheduleItemsByDateIntervalQueryHandler(IScheduleItemRepository scheduleItemRepository)
        : IRequestHandler<GetScheduleItemsByDateIntervalQuery, IEnumerable<ScheduleItemDto>>
    { 
        public async Task<IEnumerable<ScheduleItemDto>> Handle(GetScheduleItemsByDateIntervalQuery request, CancellationToken cancellationToken)
        {
            return (await scheduleItemRepository.GetByDateInterval(request.UserId, request.DateStart, request.DateEnd, cancellationToken))
                .Select(s => s.Map());
        }
    }
}