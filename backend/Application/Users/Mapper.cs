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
                Name = user.Name, 
                Email = user.Email, 
                Password = user.Password 
            };
        }
    }
}
