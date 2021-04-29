using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Grid_Game.Pages.ObjectList
{
    public class IndexModel : PageModel
    {

        private readonly ApplicationDbContext _db;

        public IndexModel(ApplicationDbContext db)
        {
            _db = db;
        }

        public IEnumerable<SortObject> SortObjects { get; set; }

        public async Task OnGet()
        {
            SortObjects = await _db.SortObject.ToListAsync();
        }

        public async Task<IActionResult> OnPostDelete(int id)
        {
            var sortObject = await _db.SortObject.FindAsync(id);
            if (sortObject == null)
            {
                return NotFound();
            }
            _db.SortObject.Remove(sortObject);
            await _db.SaveChangesAsync();

            return RedirectToPage("Index");
        }
    }
}
