using Microsoft.EntityFrameworkCore.Migrations;

namespace Grid_Game.Migrations
{
    public partial class AddISBNToBookModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "SortObject",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "SortObject");
        }
    }
}
