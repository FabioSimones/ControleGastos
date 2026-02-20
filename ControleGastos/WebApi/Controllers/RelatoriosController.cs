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
        public async Task<IActionResult> TotaisPorPessoa(
            [FromQuery] DateOnly? dataInicio,
            [FromQuery] DateOnly? dataFim,
            CancellationToken ct)
        {
            var result = await _service.ObterTotaisPorPessoaAsync(dataInicio, dataFim, ct);
            return Ok(result);
        }
    }
}
