using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Grid_Game.Areas.Rankings.Pages
{

    public class VoteModel : PageModel
    {
        private readonly ApplicationDbContext _db;
        
        [BindProperty]
        public string Label { get; set; }

        public VoteModel(ApplicationDbContext db)
        {
            _db = db;
        }

        
        public void OnGet()
        {
        }
        
    }
}
