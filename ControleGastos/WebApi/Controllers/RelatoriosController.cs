using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using static Domain.DTOs.RelatorioDTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/relatorios")]
    public class RelatoriosController : ControllerBase
    {
        private readonly IRelatorioService _service;

        public RelatoriosController(IRelatorioService service)
        {
            _service = service;
        }

        [HttpGet("totais-por-pessoa")]
        [ProducesResponseType(typeof(TotaisPorPessoaResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> TotaisPorPessoa(CancellationToken ct)
        {
            var result = await _service.ObterTotaisPorPessoaAsync(ct);
            return Ok(result);
        }
    }
}
