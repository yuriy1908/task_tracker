using Domain.ScheduleItems;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ScheduleItems.Queries
{
    public record GetScheduleItemByIdQuery(int id) : IRequest<ScheduleItemDto>;

    public class GetScheduleItemByIdQueryHandler(IScheduleItemRepository scheduleItemRepository) : IRequestHandler<GetScheduleItemByIdQuery, ScheduleItemDto>
    { 
        public async Task<ScheduleItemDto> Handle(GetScheduleItemByIdQuery request, CancellationToken cancellationToken)
        {
            var scheduleItem = await scheduleItemRepository.GetById(request.id, cancellationToken);
            if (scheduleItem != null) 
                return scheduleItem.Map();
            throw new Exception("Not found entity");
        }
    }
}
