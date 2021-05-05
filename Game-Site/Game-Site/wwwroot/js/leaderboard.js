var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/SortObject",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "rank", "width": "5%", defaultContent: '' },
            { "data": "name", "width": "15%" },
            { "data": "wins", "width": "15%" },
            { "data": "losses", "width": "15%" },
            { "data": "total", "width": "15%", defaultContent: '' },
            {
                "data": "rating", "width": "15%",
                render: function (data) {
                    return Math.floor(data);
                }
            },
        ],
        "language": {
            "emptyTable": "No data found"
        },
        "width": "100%",
        "aaSorting": [[1, 'asc']], 
        drawCallback: function () {
            var total = 0;
            var api = this.api();
            var arr = api.columns(5).data()[0];  //get array of column 4 (rating)
            var sorted = arr.slice().sort(function (a, b) { return b - a });
            var ranks = arr.slice().map(function (v) { return sorted.indexOf(v) + 1 });
            // interate through each row
            api.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var data = this.data();
                console.log(data.name, data.rating, ranks[arr.indexOf(data.rating)]);
                data.rank = ranks[arr.indexOf(data.rating)];  //set the rank column = the array index of the extn in the ranked array
                data.total = data.wins + data.losses;
                total += data.total;
            });
            api.rows().invalidate();
            total = Math.floor(total / 2);
            var totalText = document.getElementById("total");
            totalText.innerText = "Total Games: " + total;
        }
    });
    
}
