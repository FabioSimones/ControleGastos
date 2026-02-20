using Entities.Entities;

namespace Infra.Persistence.Repositories.Abstractions
{
    public interface ITransacaoRepository : IRepository<Transacao>
    {
        Task<List<Transacao>> ListByPeriodoAsync(DateOnly? dataInicio, DateOnly? dataFim, CancellationToken ct = default);
    }
}
