using Microsoft.EntityFrameworkCore.Migrations;

namespace Grid_Game.Migrations
{
    public partial class AddRankToSortObjectModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "SortObject",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Rank",
                table: "SortObject",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rank",
                table: "SortObject");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "SortObject",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
