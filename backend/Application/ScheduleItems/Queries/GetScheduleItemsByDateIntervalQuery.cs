using Application.ScheduleItems;
using Domain.ScheduleItems;
using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ScheduleItems.Queries
{
    public record GetScheduleItemsByDateIntervalQuery(DateTime DateStart, DateTime DateEnd) : IRequest<IEnumerable<ScheduleItemDto>>;

    public class GetScheduleItemsByDateIntervalQueryHandler(IScheduleItemRepository scheduleItemRepository, IUserContext userContext)
        : IRequestHandler<GetScheduleItemsByDateIntervalQuery, IEnumerable<ScheduleItemDto>>
    { 
        public async Task<IEnumerable<ScheduleItemDto>> Handle(GetScheduleItemsByDateIntervalQuery request, CancellationToken cancellationToken)
        {
            return (await scheduleItemRepository.GetByDateInterval(userContext.GetUserId(), request.DateStart, request.DateEnd, cancellationToken))
                .Select(s => s.Map());
        }
    }
}