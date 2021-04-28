using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Grid_Game.Model
{
    public class SortObject
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public double Rating { get; set; }
    }
}
