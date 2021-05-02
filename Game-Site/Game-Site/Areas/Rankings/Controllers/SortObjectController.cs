using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grid_Game.Controllers
{
    [Route("api/SortObject")]
    [ApiController]
    public class SortObjectController : Controller
    {
        private readonly ApplicationDbContext _db;
        public SortObjectController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = await _db.SortObject.ToListAsync() });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id) {
            var sortObjectFromDb = await _db.SortObject.FirstOrDefaultAsync(u => u.Id == id);
            if (sortObjectFromDb == null)
            {
                return Json(new { success = false, message = "Error while Deleting." });
            }
            _db.SortObject.Remove(sortObjectFromDb);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "Delete Successful." });
        }
    }
}
