using static Domain.DTOs.RelatorioDTO;

namespace Domain.Interfaces.Services
{
    public interface IRelatorioService
    {
        Task<TotaisPorPessoaResponse> ObterTotaisPorPessoaAsync(
            DateOnly? dataInicio,
            DateOnly? dataFim,
            CancellationToken ct);
    }
}
