using Entities.Entities;
using Infra.Persistence.Repositories.Abstractions;

namespace Infra.Persistence.Repositories.Implementations
{
    public class PessoaRepository : Repository<Pessoa>, IPessoaRepository
    {
        public PessoaRepository(AppDbContext db) : base(db) { }
    }
}
