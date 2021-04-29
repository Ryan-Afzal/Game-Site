using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Grid_Game.Areas.Rankings.Pages
{
    public class LeaderboardModel : PageModel
    {

        private readonly ApplicationDbContext _db;
        public LeaderboardModel(ApplicationDbContext db)
        {
            _db = db;
        }

        public IEnumerable<SortObject> SortObjects { get; set; }

        public async Task OnGet()
        {
            SortObjects = await _db.SortObject.ToListAsync();
        }
    }
}
