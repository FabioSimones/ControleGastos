using System.ComponentModel.DataAnnotations;

namespace Entities.Entities
{
    public class Pessoa : Base
    {
        [Required, MaxLength(200)]
        public string Nome { get; private set; } = string.Empty;

        [Range(0, 130)]
        public int Idade { get; private set; }

        public IReadOnlyCollection<Transacao> Transacoes => _transacoes;
        private readonly List<Transacao> _transacoes = new();

        protected Pessoa() { }

        public Pessoa(string nome, int idade)
        {
            SetNome(nome);
            SetIdade(idade);
        }

        public void SetNome(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome)) throw new ArgumentException("Nome é obrigatório.");
            if (nome.Length > 200) throw new ArgumentException("Nome deve ter no máximo 200 caracteres.");
            Nome = nome.Trim();
        }

        public void SetIdade(int idade)
        {
            if (idade < 0) throw new ArgumentException("Idade inválida.");
            Idade = idade;
        }

        public bool EhMenorDeIdade() => Idade < 18;
    }
}
