using static Domain.DTOs.PessoaDTO;

namespace Domain.Interfaces.Services
{
    public interface IPessoaService
    {
        Task<PessoaResponse> CriarAsync(PessoaCreateRequest request, CancellationToken ct = default);
        Task<PessoaResponse> AtualizarAsync(int id, PessoaUpdateRequest request, CancellationToken ct = default);
        Task RemoverAsync(int id, CancellationToken ct = default);
        Task<IReadOnlyList<PessoaResponse>> ListarAsync(CancellationToken ct = default);
        Task<PessoaResponse?> ObterPorIdAsync(int id, CancellationToken ct = default);
    }
}
