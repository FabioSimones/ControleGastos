using static Domain.DTOs.RelatorioDTO;

namespace Domain.Interfaces.Services
{
    public interface IRelatorioService
    {
        Task<TotaisPorPessoaResponse> ObterTotaisPorPessoaAsync(CancellationToken ct = default);
    }
}
