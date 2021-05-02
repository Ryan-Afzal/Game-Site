using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grid_Game.Controllers
{
    [Area("Rankings")]
    [Route("api/[controller]")]
    [ApiController]
    public class SortObjectController : Controller
    {
        private readonly ApplicationDbContext _db;
        public SortObjectController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<SortObjectGetOutputModel>> GetAll()
        {
            return new SortObjectGetOutputModel() {
                Output = await _db.SortObject.ToArrayAsync()
            };
        }

        [HttpDelete]
        public async Task<ActionResult<SortObjectDeleteOutputModel>> Delete(int id) {
            var sortObjectFromDb = await _db.SortObject.FirstOrDefaultAsync(u => u.Id == id);
            if (sortObjectFromDb == null)
            {
                return new SortObjectDeleteOutputModel() {
                    Success = false,
                    Response = "Error while Deleting."
                };
            }
            _db.SortObject.Remove(sortObjectFromDb);
            await _db.SaveChangesAsync();
            return new SortObjectDeleteOutputModel() {
                Success = true,
                Response = "Delete Successful."
            };
        }
    }
}
