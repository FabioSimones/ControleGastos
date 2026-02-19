using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using static Domain.DTOs.CategoriaDTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _service;

        public CategoriasController(ICategoriaService service)
        {
            _service = service;
        }

        [HttpPost]
        [ProducesResponseType(typeof(CategoriaResponse), StatusCodes.Status201Created)]
        public async Task<IActionResult> Criar([FromBody] CategoriaCreateRequest request, CancellationToken ct)
        {
            var created = await _service.CriarAsync(request, ct);
            return CreatedAtAction(nameof(Listar), null, created);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyList<CategoriaResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Listar(CancellationToken ct)
        {
            var list = await _service.ListarAsync(ct);
            return Ok(list);
        }
    }
}
