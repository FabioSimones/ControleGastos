using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infra.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
        public DbSet<Categoria> Categorias => Set<Categoria>();
        public DbSet<Transacao> Transacoes => Set<Transacao>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is Base && (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                
                if (entry.State == EntityState.Added)
                {                    
                    entry.Property(nameof(Base.CreatedAt)).CurrentValue = DateTime.UtcNow;
                    entry.Property(nameof(Base.UpdatedAt)).CurrentValue = null;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Property(nameof(Base.UpdatedAt)).CurrentValue = DateTime.UtcNow;
                    entry.Property(nameof(Base.CreatedAt)).IsModified = false; 
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

    }
}
