var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/sortObject", 
            "type": "GET", 
            "datatype": "json"
        }, 
        "columns": [
            { "data": "name", "width": "15%" },
            { "data": "wins", "width": "15%" },
            { "data": "losses", "width": "15%" },
            { "data": "rating", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/ObjectList/Edit?id=${data}" class="btn btn-success text-white" style="cursor: pointer; width: 70px;"> Edit </a>
                        &nbsp;
                        <a class="btn btn-danger text-white" style="cursor: pointer; width: 70px;"> Delete </a>
                    </div>`;
                }, "width":"30%"
            }
        ], 
        "language": {
            "emptyTable": "No data found"
        }, 
        "width": "100%"
    })
}