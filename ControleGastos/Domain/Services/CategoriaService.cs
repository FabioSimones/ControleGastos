using Domain.Interfaces.Services;
using Entities.Entities;
using Infra.Persistence.Repositories.Abstractions;
using Infra.Persistence.UnitOfWork;
using static Domain.DTOs.CategoriaDTO;

namespace Domain.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _categoriaRepo;
        private readonly IUnitOfWork _uow;

        public CategoriaService(ICategoriaRepository categoriaRepo, IUnitOfWork uow)
        {
            _categoriaRepo = categoriaRepo;
            _uow = uow;
        }

        public async Task<CategoriaResponse> CriarAsync(CategoriaCreateRequest request, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(request.Descricao))
                throw new InvalidOperationException("Descrição é obrigatória.");

            if (request.Descricao.Length > 400)
                throw new InvalidOperationException("Descrição deve ter no máximo 400 caracteres.");

            var categoria = new Categoria(request.Descricao, request.Finalidade);

            await _categoriaRepo.AddAsync(categoria, ct);
            await _uow.SaveChangesAsync(ct);

            return new CategoriaResponse(categoria.Id, categoria.Descricao, categoria.Finalidade);
        }

        public async Task<IReadOnlyList<CategoriaResponse>> ListarAsync(CancellationToken ct = default)
        {
            var list = await _categoriaRepo.ListAsync(ct);
            return list.Select(c => new CategoriaResponse(c.Id, c.Descricao, c.Finalidade)).ToList();
        }
    }
}
