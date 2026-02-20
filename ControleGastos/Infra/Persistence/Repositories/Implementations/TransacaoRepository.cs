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

        public async Task<List<Transacao>> ListByPeriodoAsync(
            DateOnly? dataInicio,
            DateOnly? dataFim,
            CancellationToken ct = default)
        {
            var query = _set
                .AsNoTracking()
                .AsQueryable();

            if (dataInicio.HasValue)
            {
                var inicioUtc = dataInicio.Value
                    .ToDateTime(TimeOnly.MinValue)
                    .ToUniversalTime();

                query = query.Where(t => t.CreatedAt >= inicioUtc);
            }

            if (dataFim.HasValue)
            {
                var fimUtc = dataFim.Value
                    .ToDateTime(TimeOnly.MaxValue)
                    .ToUniversalTime();

                query = query.Where(t => t.CreatedAt <= fimUtc);
            }

            return await query.ToListAsync(ct);
        }
    }
}
