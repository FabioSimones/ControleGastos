using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using static Domain.DTOs.PessoaDTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/pessoas")]
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaService _service;

        public PessoasController(IPessoaService service)
        {
            _service = service;
        }

        [HttpPost]
        [ProducesResponseType(typeof(PessoaResponse), StatusCodes.Status201Created)]
        public async Task<IActionResult> Criar([FromBody] PessoaCreateRequest request, CancellationToken ct)
        {
            var created = await _service.CriarAsync(request, ct);
            return CreatedAtAction(nameof(ObterPorId), new { id = created.Id }, created);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyList<PessoaResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Listar(CancellationToken ct)
        {
            var list = await _service.ListarAsync(ct);
            return Ok(list);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(PessoaResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ObterPorId([FromRoute] int id, CancellationToken ct)
        {
            var pessoa = await _service.ObterPorIdAsync(id, ct);
            return pessoa is null ? NotFound() : Ok(pessoa);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(PessoaResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> Atualizar([FromRoute] int id, [FromBody] PessoaUpdateRequest request, CancellationToken ct)
        {
            var updated = await _service.AtualizarAsync(id, request, ct);
            return Ok(updated);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Remover([FromRoute] int id, CancellationToken ct)
        {
            await _service.RemoverAsync(id, ct);
            return NoContent();
        }
    }
}
