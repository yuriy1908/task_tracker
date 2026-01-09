using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users
{
    public interface IUserRepository
    {
        Task<User?> GetById(int id, CancellationToken cancellationToken);
        Task<User?> GetByName(string name, CancellationToken cancellationToken);
        Task<User?> GetByEmail(string email, CancellationToken cancellationToken);
        Task<IEnumerable<User>> GetAll(CancellationToken cancellationToken);
        Task<int> Add(User user, CancellationToken cancellationToken);
        Task Update(User user, CancellationToken cancellationToken);
        Task Delete(int id, CancellationToken cancellationToken);
    }
}
