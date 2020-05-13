using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Grid_Game.Areas.Games.Pages {
    public class Game_PrototypeModel : PageModel {
        public IActionResult OnGet() {
#if !DEBUG
            return NotFound();
#else
            return Page();
#endif
        }
    }
}
