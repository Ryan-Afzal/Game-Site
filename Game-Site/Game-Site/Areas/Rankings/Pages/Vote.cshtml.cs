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
        private double kfactor = 20.0;
        private double default_rtg = 1500.0;
        private string[] keywords = new string[] { "Start", "Loading", "..." };
        private string[] states = new string[] { "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming" };
        private int temp = 0;
        
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
