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
            { "data": "name", "width": "15%" },
            { "data": "wins", "width": "15%" },
            { "data": "losses", "width": "15%" },
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
        "width": "100%"
    })
}
