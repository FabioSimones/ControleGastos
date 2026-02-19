using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs
{
    public class PessoaDTO
    {
        
        public sealed record PessoaCreateRequest(string Nome, int Idade);

        public sealed record PessoaUpdateRequest(string Nome, int Idade);

        public sealed record PessoaResponse(int Id, string Nome, int Idade);


    }
}
