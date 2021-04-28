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
        public SortObject SortObjects { get; set; }
        public void OnGet()
        {
        }
    }
}
