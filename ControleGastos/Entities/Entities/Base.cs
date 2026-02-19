using Entities.Notificacoes;

namespace Entities.Entities
{
    public class Base : Notifica
    {
        public int Id { get; protected set; }

        public DateTime CreatedAt { get; protected set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; protected set; }

    }
}
