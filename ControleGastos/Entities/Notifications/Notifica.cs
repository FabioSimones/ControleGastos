using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Entities.Notificacoes
{
    public class Notifica
    {   
        [JsonIgnore]
        [NotMapped]
        public string? NomePropriedade { get; set; }

        [JsonIgnore]
        [NotMapped]
        public string? mensagem { get; set; }

        [JsonIgnore]
        [NotMapped]
        public List<Notifica>? notificacoes { get; set; }

        public Notifica()
        {
            notificacoes = new List<Notifica>();
        }

        public bool ValidarPropriedadeString(string valor, string nomePropriedade)
        {
            if (string.IsNullOrWhiteSpace(valor) || string.IsNullOrWhiteSpace(nomePropriedade))
            {
                notificacoes?.Add(new Notifica
                 {
                     NomePropriedade = nomePropriedade,
                     mensagem = $"O campo {nomePropriedade} é obrigatório."
                 });

                return false;
            }
            return true;
        }

        public bool ValidaPropriedadeInt(int valor, string nomePropriedade)
        {
            if (valor <= 1 || string.IsNullOrWhiteSpace(nomePropriedade))
            {
                notificacoes?.Add(new Notifica
                {
                    NomePropriedade = nomePropriedade,
                    mensagem = $"O campo {nomePropriedade} deve ser maior que zero."
                });
                return false;
            }
            return true;
        }
    }
}
