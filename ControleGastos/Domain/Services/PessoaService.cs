using Domain.Interfaces.Services;
using Entities.Entities;
using Infra.Persistence.Repositories.Abstractions;
using static Domain.DTOs.PessoaDTO;
using Infra.Persistence.UnitOfWork;

namespace Domain.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IRepository<Pessoa> _pessoas;
        private readonly IUnitOfWork _uow;

        public PessoaService(IRepository<Pessoa> pessoas, IUnitOfWork uow)
        {
            _pessoas = pessoas;
            _uow = uow;
        }

        public async Task<PessoaResponse> CriarAsync(PessoaCreateRequest request, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(request.Nome))
                throw new InvalidOperationException("Nome é obrigatório.");

            if (request.Nome.Length > 200)
                throw new InvalidOperationException("Nome deve ter no máximo 200 caracteres.");

            if (request.Idade < 0)
                throw new InvalidOperationException("Idade inválida.");

            var pessoa = new Pessoa(request.Nome, request.Idade);

            await _pessoas.AddAsync(pessoa, ct);
            await _uow.SaveChangesAsync(ct);

            return new PessoaResponse(pessoa.Id, pessoa.Nome, pessoa.Idade);
        }

        public async Task<PessoaResponse> AtualizarAsync(int id, PessoaUpdateRequest request, CancellationToken ct = default)
        {
            var pessoa = await _pessoas.GetByIdAsync(id, ct);
            if (pessoa is null)
                throw new KeyNotFoundException("Pessoa não encontrada.");

            pessoa.SetNome(request.Nome);
            pessoa.SetIdade(request.Idade);

            _pessoas.Update(pessoa);
            await _uow.SaveChangesAsync(ct);

            return new PessoaResponse(pessoa.Id, pessoa.Nome, pessoa.Idade);
        }

        public async Task RemoverAsync(int id, CancellationToken ct = default)
        {
            var pessoa = await _pessoas.GetByIdAsync(id, ct);
            if (pessoa is null)
                throw new KeyNotFoundException("Pessoa não encontrada.");

            _pessoas.Remove(pessoa);
            await _uow.SaveChangesAsync(ct);
            // Transações são removidas pelo cascade delete no EF.
        }

        public async Task<IReadOnlyList<PessoaResponse>> ListarAsync(CancellationToken ct = default)
        {
            var list = await _pessoas.ListAsync(ct);
            return list.Select(p => new PessoaResponse(p.Id, p.Nome, p.Idade)).ToList();
        }

        public async Task<PessoaResponse?> ObterPorIdAsync(int id, CancellationToken ct = default)
        {
            var pessoa = await _pessoas.GetByIdAsync(id, ct);
            return pessoa is null ? null : new PessoaResponse(pessoa.Id, pessoa.Nome, pessoa.Idade);
        }
    }
}
