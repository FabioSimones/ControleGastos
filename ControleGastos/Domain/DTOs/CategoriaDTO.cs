using Entities.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs
{
    public class CategoriaDTO
    {
        
        public sealed record CategoriaCreateRequest(string Descricao, CategoriaFinalidade Finalidade);

        public sealed record CategoriaResponse(int Id, string Descricao, CategoriaFinalidade Finalidade);

    }
}
