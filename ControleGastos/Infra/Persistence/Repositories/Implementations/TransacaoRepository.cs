using Entities.Entities;
using Infra.Persistence.Repositories.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Infra.Persistence.Repositories.Implementations
{
    public class TransacaoRepository : Repository<Transacao>, ITransacaoRepository
    {
        public TransacaoRepository(AppDbContext db) : base(db) { }

        public async Task<IReadOnlyList<Transacao>> ListarPorPessoaAsync(int pessoaId, CancellationToken ct = default)
            => await _set.AsNoTracking()
                .Where(t => t.PessoaId == pessoaId)
                .Include(t => t.Categoria) 
                .ToListAsync(ct);
    }
}
