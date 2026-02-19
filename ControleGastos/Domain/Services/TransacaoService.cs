using Domain.Interfaces.Services;
using Entities.Entities;
using Entities.Entities.Enums;
using Infra.Persistence.Repositories.Abstractions;
using Infra.Persistence.UnitOfWork;
using static Domain.DTOs.TransacaoDTO;

namespace Domain.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepo;
        private readonly IPessoaRepository _pessoaRepo;
        private readonly ICategoriaRepository _categoriaRepo;
        private readonly IUnitOfWork _uow;

        public TransacaoService(
            ITransacaoRepository transacaoRepo,
            IPessoaRepository pessoaRepo,
            ICategoriaRepository categoriaRepo,
            IUnitOfWork uow)
        {
            _transacaoRepo = transacaoRepo;
            _pessoaRepo = pessoaRepo;
            _categoriaRepo = categoriaRepo;
            _uow = uow;
        }

        public async Task<TransacaoResponse> CriarAsync(TransacaoCreateRequest request, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(request.Descricao))
                throw new InvalidOperationException("Descrição é obrigatória.");

            if (request.Descricao.Length > 400)
                throw new InvalidOperationException("Descrição deve ter no máximo 400 caracteres.");

            if (request.Valor <= 0)
                throw new InvalidOperationException("O valor da transação deve ser positivo.");

            var pessoa = await _pessoaRepo.GetByIdAsync(request.PessoaId, ct);
            if (pessoa is null)
                throw new KeyNotFoundException("Pessoa não encontrada.");

            if (pessoa.Idade < 18 && request.Tipo != TransacaoTipo.Despesas)
                throw new InvalidOperationException("Para menores de idade, apenas transações do tipo DESPESA são permitidas.");

            var categoria = await _categoriaRepo.GetByIdAsync(request.CategoriaId, ct);
            if (categoria is null)
                throw new KeyNotFoundException("Categoria não encontrada.");

            if (!CategoriaAceitaTipo(categoria.Finalidade, request.Tipo))
                throw new InvalidOperationException("A categoria informada não é compatível com o tipo da transação.");

            var transacao = new Transacao(
                request.Descricao,
                request.Valor,
                request.Tipo,
                request.PessoaId,
                request.CategoriaId
            );

            await _transacaoRepo.AddAsync(transacao, ct);
            await _uow.SaveChangesAsync(ct);

            return new TransacaoResponse(
                transacao.Id,
                transacao.Descricao,
                transacao.Valor,
                transacao.Tipo,
                transacao.CategoriaId,
                transacao.PessoaId
            );
        }

        public async Task<IReadOnlyList<TransacaoResponse>> ListarAsync(CancellationToken ct = default)
        {
            var list = await _transacaoRepo.ListAsync(ct);
            return list.Select(t => new TransacaoResponse(
                t.Id,
                t.Descricao,
                t.Valor,
                t.Tipo,
                t.CategoriaId,
                t.PessoaId
            )).ToList();
        }

        private static bool CategoriaAceitaTipo(CategoriaFinalidade finalidade, TransacaoTipo tipo)
        {
            return finalidade == CategoriaFinalidade.Ambas
                   || (finalidade == CategoriaFinalidade.Despesas && tipo == TransacaoTipo.Despesas)
                   || (finalidade == CategoriaFinalidade.Receitas && tipo == TransacaoTipo.Receitas);
        }
    }
}
