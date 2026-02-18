using Entities.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace Entities.Entities
{
    public class Transacao : Base
    {
        [Required, MaxLength(400)]
        public string Descricao { get; private set; } = string.Empty;

        [Range(typeof(decimal), "0.01", "9999999999999999")]
        public decimal Valor { get; private set; }

        public TransacaoTipo Tipo { get; private set; }

        public int PessoaId { get; private set; }
        public Pessoa Pessoa { get; private set; } = null!;

        public int CategoriaId { get; private set; }
        public Categoria Categoria { get; private set; } = null!;

        protected Transacao() { }

        public Transacao(
            string descricao,
            decimal valor,
            TransacaoTipo tipo,
            int pessoaId,
            int categoriaId)
        {
            SetDescricao(descricao);
            SetValor(valor);
            Tipo = tipo;
            PessoaId = pessoaId;
            CategoriaId = categoriaId;
        }

        public void SetDescricao(string descricao)
        {
            if (string.IsNullOrWhiteSpace(descricao)) throw new ArgumentException("Descrição é obrigatória.");
            if (descricao.Length > 400) throw new ArgumentException("Descrição deve ter no máximo 400 caracteres.");
            Descricao = descricao.Trim();
        }

        public void SetValor(decimal valor)
        {
            if (valor <= 0) throw new ArgumentException("Valor deve ser positivo.");
            Valor = valor;
        }

    }
}
