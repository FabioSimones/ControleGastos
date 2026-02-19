using Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Persistence.Configuration
{
    public class TransacaoConfiguration : IEntityTypeConfiguration<Transacao>
    {
        public void Configure(EntityTypeBuilder<Transacao> builder)
        {
            builder.ToTable("Transacoes");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Descricao)
                .IsRequired()
                .HasMaxLength(400);

            builder.Property(t => t.Tipo)
                .IsRequired()
                .HasConversion<int>();

            builder.Property(t => t.Valor)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.HasOne(t => t.Categoria)
                .WithMany()
                .HasForeignKey(t => t.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict); 

            builder.HasOne(t => t.Pessoa)
                .WithMany(t => t.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(t => t.PessoaId);
            builder.HasIndex(t => t.CategoriaId);
        }
    }
}
