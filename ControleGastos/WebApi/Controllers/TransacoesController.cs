using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using static Domain.DTOs.TransacaoDTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
        private readonly ITransacaoService _service;

        public TransacoesController(ITransacaoService service)
        {
            _service = service;
        }

        [HttpPost]
        [ProducesResponseType(typeof(TransacaoResponse), StatusCodes.Status201Created)]
        public async Task<IActionResult> Criar([FromBody] TransacaoCreateRequest request, CancellationToken ct)
        {
            var created = await _service.CriarAsync(request, ct);
            return CreatedAtAction(nameof(Listar), null, created);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyList<TransacaoResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Listar(CancellationToken ct)
        {
            var list = await _service.ListarAsync(ct);
            return Ok(list);
        }
    }
}
