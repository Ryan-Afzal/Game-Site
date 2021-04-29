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
                        <a class="btn btn-danger text-white" style="cursor: pointer; width: 70px;" onclick=Delete('/api/sortObject?id='+${data})> Delete </a>
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

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover it.",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}