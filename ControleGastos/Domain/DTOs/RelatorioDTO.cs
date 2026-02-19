namespace Domain.DTOs
{
    public class RelatorioDTO
    {
        public sealed record TotaisPorPessoaItemResponse(
            int PessoaId,
            string PessoaNome,
            decimal TotalReceitas,
            decimal TotalDespesas,
            decimal Saldo
        );

        public sealed record TotaisPorPessoaResponse(
            IReadOnlyList<TotaisPorPessoaItemResponse> Itens,
            decimal TotalReceitasGeral,
            decimal TotalDespesasGeral,
            decimal SaldoLiquidoGeral
        );
    }
}
