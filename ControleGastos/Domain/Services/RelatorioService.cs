using Domain.Interfaces.Services;
using Entities.Entities.Enums;
using Infra.Persistence.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using static Domain.DTOs.RelatorioDTO;

namespace Domain.Services
{
    public class RelatorioService : IRelatorioService
    {
        private readonly IPessoaRepository _pessoaRepo;
        private readonly ITransacaoRepository _transacaoRepo;

        public RelatorioService(IPessoaRepository pessoaRepo, ITransacaoRepository transacaoRepo)
        {
            _pessoaRepo = pessoaRepo;
            _transacaoRepo = transacaoRepo;
        }

        public async Task<TotaisPorPessoaResponse> ObterTotaisPorPessoaAsync(CancellationToken ct = default)
        {
            var pessoas = await _pessoaRepo.ListAsync(ct);
            var transacoes = await _transacaoRepo.ListAsync(ct);

            var itens = pessoas.Select(p =>
            {
                var tPessoa = transacoes.Where(t => t.PessoaId == p.Id).ToList();

                var receitas = tPessoa
                    .Where(t => t.Tipo == TransacaoTipo.Receitas)
                    .Sum(t => t.Valor);

                var despesas = tPessoa
                    .Where(t => t.Tipo == TransacaoTipo.Despesas)
                    .Sum(t => t.Valor);

                return new TotaisPorPessoaItemResponse(
                    PessoaId: p.Id,
                    PessoaNome: p.Nome,
                    TotalReceitas: receitas,
                    TotalDespesas: despesas,
                    Saldo: receitas - despesas
                );
            }).ToList();

            var totalReceitasGeral = itens.Sum(i => i.TotalReceitas);
            var totalDespesasGeral = itens.Sum(i => i.TotalDespesas);
            var saldoLiquidoGeral = totalReceitasGeral - totalDespesasGeral;

            return new TotaisPorPessoaResponse(itens, totalReceitasGeral, totalDespesasGeral, saldoLiquidoGeral);
        }
    }
}
