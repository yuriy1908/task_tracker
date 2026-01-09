using Application.ScheduleItems;
using Application.ScheduleItems.Commands;
using Application.ScheduleItems.Queries;
using MediatR;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleItemController(IMediator mediator) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ScheduleItemDto?> GetById(int id)
        {
            try
            {
                return await mediator.Send(new GetScheduleItemByIdQuery(id));
            }

            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet("by-user/{userId}")]
        public async Task<IEnumerable<ScheduleItemDto>> GetByUserId(int userId)
        {
            return await mediator.Send(new GetScheduleItemsByUserIdQuery(userId));
        }

        [HttpGet("by-date-interval/{userId}/{dateStart}/{dateEnd}")]
        public async Task<IEnumerable<ScheduleItemDto>> GetByDateInterval(int userId, DateTime dateStart, DateTime dateEnd)
        {
                return await mediator.Send(new GetScheduleItemsByDateIntervalQuery(userId, dateStart, dateEnd));
        }

        [HttpGet]
        public async Task<IEnumerable<ScheduleItemDto>> GetAll()
        {
            return await mediator.Send(new GetScheduleItemsQuery());
        }

        [HttpPost]
        public async Task<int> Create(CreateScheduleItemCommand command)
        {
            return await mediator.Send(command);
        }

        [HttpPut]
        public async Task Update(UpdateScheduleItemCommand command)
        {
            await mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await mediator.Send(new DeleteScheduleItemCommand(id)); 
        }
    }
}