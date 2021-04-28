using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Grid_Game.Pages.ObjectList
{
    public class CreateModel : PageModel
    {
        private readonly ApplicationDbContext _db;

        public CreateModel(ApplicationDbContext db)
        {
            _db = db;
        }
        [BindProperty]
        public SortObject SortObjects { get; set; }
        public void OnGet()
        {

        }
        public async Task<IActionResult> OnPost()
        {
            if (ModelState.IsValid)
            {
                SortObjects.Rating = 1500;
                await _db.AddAsync(SortObjects);
                await _db.SaveChangesAsync();
                return RedirectToPage("Index");
            } else
            {
                return Page();
            }
        }
    }
}
