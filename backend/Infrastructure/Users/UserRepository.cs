using Domain.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Infrastructure.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<int> Add(User user, CancellationToken cancellationToken)
        {
            var entity = await _context.Users.AddAsync(user, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Entity.Id;
        }

        public async Task Delete(int id, CancellationToken cancellationToken)
        {
            var entity = await GetById(id, cancellationToken);
            if (entity != null)
            {
                entity.IsDeleted = true;
                entity.UpdatedAt = DateTime.Now;
                _context.Users.Update(entity);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task<IEnumerable<User>> GetAll(CancellationToken cancellationToken)
        {
            return await _context.Users.Where(x => !x.IsDeleted).ToListAsync(cancellationToken);
        }

        public async Task<User?> GetById(int id, CancellationToken cancellationToken)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, cancellationToken);
        }

        public async Task<User?> GetByEmail(string email, CancellationToken cancellationToken)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email && !x.IsDeleted, cancellationToken);
        }

        public async Task<User?> GetByName(string name, CancellationToken cancellationToken)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Name == name && !x.IsDeleted, cancellationToken);
        }

        public async Task Update(User user, CancellationToken cancellationToken)
        {
            user.UpdatedAt = DateTime.Now;
            _context.Users.Update(user);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
