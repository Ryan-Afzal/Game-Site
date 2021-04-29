using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult GetAll()
        {
            return Json(new { data = _db.SortObject.ToList() });
        }
    }
}
