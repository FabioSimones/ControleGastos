using static Domain.DTOs.CategoriaDTO;

namespace Domain.Interfaces.Services
{
    public interface ICategoriaService
    {
        Task<CategoriaResponse> CriarAsync(CategoriaCreateRequest request, CancellationToken ct = default);
        Task<IReadOnlyList<CategoriaResponse>> ListarAsync(CancellationToken ct = default);
    }
}
