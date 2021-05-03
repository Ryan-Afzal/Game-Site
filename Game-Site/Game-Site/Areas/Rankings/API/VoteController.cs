using Grid_Game.Areas.Rankings.Model;
using Grid_Game.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grid_Game.Areas.Rankings.API
{

    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        double kfactor = 20.0;
        double default_rtg = 1500.0;
        public VoteController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<ActionResult<VoteOutputModel>> Post(VoteInputModel model)
        {
            var winner = await _db.SortObject.FirstOrDefaultAsync(u => u.Name == model.Input[0]);
            var loser = await _db.SortObject.FirstOrDefaultAsync(u => u.Name == model.Input[1]);

            if (winner == null || loser == null)
            {
                return new VoteOutputModel()
                {
                    Response = "Invalid;Request"
                };
            }
            double coef = 2.0;
            double winner_rtg = winner.Rating;
            double loser_rtg = loser.Rating;
            double p = prob(winner_rtg - loser_rtg, coef);
            double winner_delta = kfactor * p;
            double loser_delta = -kfactor * p;
            double winner_newrtg = winner_rtg + winner_delta;
            double loser_newrtg = loser_rtg + loser_delta;
            winner.Rating = winner_newrtg;
            loser.Rating = loser_newrtg;
            winner.Wins++;
            loser.Losses++;

            // Change ratings

            await _db.SaveChangesAsync();
            return new VoteOutputModel()
            {
                Response = winner.Name + ": " + Math.Floor(winner_newrtg) + " (" + Math.Floor(winner_delta) + ")" + ";" + loser.Name + ": " + Math.Floor(loser_newrtg) + " (" + Math.Floor(loser_delta) + ")"
            };
        }
        private double prob(double delta, double coef)
        {
            return 1.0 / (1.0 + Math.Pow(10.0, delta / (400.0 * coef)));
        }
    }
}
