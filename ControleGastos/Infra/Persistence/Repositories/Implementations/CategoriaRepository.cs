using Entities.Entities;
using Infra.Persistence.Repositories.Abstractions;

namespace Infra.Persistence.Repositories.Implementations
{
    public class CategoriaRepository : Repository<Categoria>, ICategoriaRepository
    {
        public CategoriaRepository(AppDbContext db) : base(db) { }
    }
}
