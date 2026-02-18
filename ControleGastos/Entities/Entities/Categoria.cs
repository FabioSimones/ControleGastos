using Entities.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace Entities.Entities
{
    public class Categoria : Base
    {
        [Required, MaxLength(400)]
        public string Descricao { get; private set; } = string.Empty;

        public CategoriaFinalidade Finalidade { get; private set; }

        protected Categoria() { }

        public Categoria(string descricao, CategoriaFinalidade finalidade)
        {
            SetDescricao(descricao);
            Finalidade = finalidade;
        }

        public void SetDescricao(string descricao)
        {
            if (string.IsNullOrWhiteSpace(descricao)) throw new ArgumentException("Descrição é obrigatória.");
            if (descricao.Length > 400) throw new ArgumentException("Descrição deve ter no máximo 400 caracteres.");
            Descricao = descricao.Trim();
        }

        public bool Aceita(TransacaoTipo tipo) =>
            Finalidade == CategoriaFinalidade.Ambas ||
            (Finalidade == CategoriaFinalidade.Despesas && tipo == TransacaoTipo.Despesas) ||
            (Finalidade == CategoriaFinalidade.Receitas && tipo == TransacaoTipo.Receitas);
    }
}
