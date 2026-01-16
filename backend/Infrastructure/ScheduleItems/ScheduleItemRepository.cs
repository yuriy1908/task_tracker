using Domain.ScheduleItems;
using Domain.Users;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Infrastructure.ScheduleItems
{
    public class ScheduleItemRepository : IScheduleItemRepository
    {
        private readonly AppDbContext _context;

        public ScheduleItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ScheduleItem> Add(ScheduleItem scheduleItem, CancellationToken cancellationToken)
        {
            var entity = await _context.ScheduleItems.AddAsync(scheduleItem, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return entity.Entity;
        }

        public async Task Delete(int id, CancellationToken cancellationToken)
        {
            var entity = await GetById(id, cancellationToken);
            if (entity is not null)
            {
                entity.IsDeleted = true;
                entity.UpdatedAt = DateTime.UtcNow;
                _context.ScheduleItems.Update(entity);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task<IEnumerable<ScheduleItem>> GetAll(CancellationToken cancellationToken)
        {
            return await _context.ScheduleItems.Where(x => !x.IsDeleted).ToListAsync(cancellationToken);
        }

        public async Task<ScheduleItem?> GetById(int id, CancellationToken cancellationToken)
        {
            return await _context.ScheduleItems.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, cancellationToken);
        }

        public async Task<IEnumerable<ScheduleItem>> GetByUserId(int UserId, CancellationToken cancellationToken)
        {
            return await _context.ScheduleItems.Where(x => x.UserId == UserId && !x.IsDeleted).ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<ScheduleItem>> GetByDateInterval
            (int UserId, DateTime DateStart, DateTime DateEnd, CancellationToken cancellationToken)
        {
            return await _context.ScheduleItems
                .Where(x => x.UserId == UserId && !x.IsDeleted && x.StartTime >= DateStart && x.StartTime <= DateEnd)
                .ToListAsync(cancellationToken);
        }
        public async Task Update(ScheduleItem scheduleItem, CancellationToken cancellationToken)
        {
            scheduleItem.UpdatedAt = DateTime.UtcNow;
            _context.ScheduleItems.Update(scheduleItem);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}