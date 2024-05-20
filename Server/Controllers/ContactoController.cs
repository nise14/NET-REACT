using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.crudproject.Models;

namespace server.crudproject.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactoController : ControllerBase
{
    private readonly ReactDbContext _dbContext;

    public ContactoController(ReactDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Route("Lista")]
    public async Task<IActionResult> Lista()
    {
        List<Contacto> lista = await _dbContext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();
        return StatusCode(StatusCodes.Status200OK, lista);
    }

    [HttpPost]
    [Route("Guardar")]
    public async Task<IActionResult> Guardar([FromBody] Contacto request)
    {
        await _dbContext.Contactos.AddAsync(request);
        await _dbContext.SaveChangesAsync();
        return StatusCode(StatusCodes.Status200OK, "OK");
    }

    [HttpPut]
    [Route("Editar")]
    public async Task<IActionResult> Editar([FromBody] Contacto request)
    {
        _dbContext.Contactos.Update(request);
        await _dbContext.SaveChangesAsync();

        return StatusCode(StatusCodes.Status200OK, "OK");
    }

    [HttpDelete]
    [Route("Eliminar/{id:int}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        Contacto contacto = await _dbContext.Contactos.FindAsync(id) ?? new();
        _dbContext.RemoveRange(contacto);
        await _dbContext.SaveChangesAsync();

        return StatusCode(StatusCodes.Status200OK, "OK");
    }
}
