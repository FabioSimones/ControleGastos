using Entities.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs
{
    public class TransacaoDTO
    {
        
        public sealed record TransacaoCreateRequest(
            string Descricao,
            decimal Valor,
            TransacaoTipo Tipo,
            int CategoriaId,
            int PessoaId
        );

        public sealed record TransacaoResponse(
            int Id,
            string Descricao,
            decimal Valor,
            TransacaoTipo Tipo,
            int CategoriaId,
            int PessoaId
        );
    }
}
