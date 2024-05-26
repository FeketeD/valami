using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using uszoeb.Models;

namespace uszoeb.Controllers
{
    [Route("api/")]
    [ApiController]
    public class uszoebController : ControllerBase
    {
        private readonly UszoebContext dbContext;

        public uszoebController(UszoebContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("GetVersenyzoNev")]
        public ActionResult GetVersenyzoNev(string nev)
        {
            try
            {
                return Ok(dbContext.Versenyzoks.Include(x => x.Orszag).Include(x => x.Szamoks).FirstOrDefault(x => x.Nev == nev));
            }
            catch (Exception e)
            {
                return StatusCode(400, e);
            }
        }

        [HttpGet("GetVersenyzokSzama")]
        public ActionResult GetVersenyzokSzama()
        {
            try
            {
                return Ok($"{dbContext.Szamoks.ToList().Count}");
            }
            catch (Exception e)
            {
                return StatusCode(400, e);
            }
        }

        [HttpPost("AddVersenyzo")]
        public ActionResult PostVersenyzo(string UID, createVersenyzoDto createVersenyzoDto)
        {
            try
            {
                if (UID == "FEB3F4FEA09CE43E")
                {
                    var request = new Versenyzok
                    {
                        Id = createVersenyzoDto.Id,
                        Nev = createVersenyzoDto.Nev,
                        OrszagId = createVersenyzoDto.OrszagId,
                        Nem = createVersenyzoDto.Nem
                    };

                    dbContext.Versenyzoks.Add(request);
                    dbContext.SaveChanges();

                    return StatusCode(201, "Versenyző hozzáadása sikeresen megtörtént.");
                }
                else
                {
                    return StatusCode(401, "Nincs jogosultsága új versenyző felvételéhez!");
                }
            }
            catch (Exception e)
            {
                return StatusCode(400, e);
            }
        }

        [HttpPut("UpdateVersenyzo")]
        public ActionResult UpdateVersenyzo(string UID, updateVersenyzoDto updateVersenyzoDto)
        {
            try
            {
                if (UID == "FEB3F4FEA09CE43E")
                {
                    var request = dbContext.Versenyzoks.FirstOrDefault(x => x.Id == updateVersenyzoDto.Id);

                    request.Nev = updateVersenyzoDto.Nev;
                    request.OrszagId = updateVersenyzoDto.OrszagId;
                    request.Nem = updateVersenyzoDto.Nem;

                    dbContext.Versenyzoks.Update(request);
                    dbContext.SaveChanges();

                    return StatusCode(201, "Versenyző adatainak a módosítása sikeresen megtörtént.");
                }
                else
                {
                    return StatusCode(401, "Nincs jogosultsága a versenyzők adatainak a módosításához!");
                }
            }
            catch (Exception e)
            {
                return StatusCode(400, e);
            }
        }

        [HttpDelete("DeleteVersenyzo")]
        public ActionResult DeleteVersenyzo(string UID, deleteVersenyzoDto deleteVersenyzoDto)
        {
            try
            {
                if (UID == "FEB3F4FEA09CE43E")
                {
                    var request = dbContext.Versenyzoks.FirstOrDefault(x => x.Id == deleteVersenyzoDto.Id);

                    dbContext.Versenyzoks.Remove(request);
                    dbContext.SaveChanges();

                    return StatusCode(204, "Versenyző adatainak a törlése sikeresen megtörtént.");
                }
                else
                {
                    return StatusCode(401, "Nincs jogosultsága a versenyzők adatainak a törléséhez!");
                }
            }
            catch (Exception e)
            {
                return StatusCode(400, e.Message);
            }
        }
    }
}