using Grid_Game.Areas.Rankings.Model;
using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grid_Game.Areas.Rankings.Controllers
{
    [Route("Rankings/Controllers/Vote")]
    [ApiController]
    public class VoteController : Controller
    {
        private readonly ApplicationDbContext _db;
        public VoteController(ApplicationDbContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult<VoteOutputModel>> Post(VoteInputModel model)
        {
            var winner = await _db.SortObject.FirstOrDefaultAsync(u => u.Name == model.Input[0]);
            var loser = await _db.SortObject.FirstOrDefaultAsync(u => u.Name == model.Input[1]);

            if (winner == null || loser == null)
            {
                return new VoteOutputModel()
                {
                    Response = "Invalid request"
                };
            }

            // Change ratings

            await _db.SaveChangesAsync();
            return new VoteOutputModel()
            {
                Response = model.Input[0] + " " + model.Input[1]
            };
        }
    }
}
