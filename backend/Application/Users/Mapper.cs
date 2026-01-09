using Domain.Users;

namespace Application.Users
{
    public static class Mapper
    {
        public static UserDto Map(this User user)
        {
            return new UserDto()
            { 
                Id = user.Id, 
                Email = user.Email, 
                Password = user.Password 
            };
        }
    }
}
