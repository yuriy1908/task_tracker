using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Users.Commands;
using Application.Users.Queries;
using Application.Users;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(IMediator mediator) : ControllerBase
    {

        [HttpGet("{id}")]
        public async Task<UserDto?> GetById(int id)
        {
            try
            {
                return await mediator.Send(new GetUserByIdQuery(id));
            }

            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet("by-email/{email}")]
        public async Task<UserDto?> GetByEmail(string email)
        {
            try
            {
                return await mediator.Send(new GetUserByEmailQuery(email));
            }

            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetAll()
        {
            return await mediator.Send(new GetUsersQuery());
        }

        [HttpPut]
        public async Task Update(UpdateUserCommand command)
        {
            await mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await mediator.Send(new DeleteUserCommand(id));
        }

        [HttpPost("register")]
        public async Task<int> Register(RegisterUserCommand command)
        {
            return await mediator.Send(command);
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginUserResponseDto>> Login(LoginUserCommand command)
        {
            try
            {
                var result = await mediator.Send(command);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
