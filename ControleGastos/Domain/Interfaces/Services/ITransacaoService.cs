using static Domain.DTOs.TransacaoDTO;

namespace Domain.Interfaces.Services
{
    public interface ITransacaoService
    {
        Task<TransacaoResponse> CriarAsync(TransacaoCreateRequest request, CancellationToken ct = default);
        Task<IReadOnlyList<TransacaoResponse>> ListarAsync(CancellationToken ct = default);
    }
}
