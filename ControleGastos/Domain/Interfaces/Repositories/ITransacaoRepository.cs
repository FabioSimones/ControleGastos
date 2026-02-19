using Entities.Entities;

namespace Infra.Persistence.Repositories.Abstractions
{
    public interface ITransacaoRepository : IRepository<Transacao>
    {
        Task<IReadOnlyList<Transacao>> ListarPorPessoaAsync(int pessoaId, CancellationToken ct = default);
    }
}
