$('document').ready(function () {
    var randomBool = function () {
        return Math.random() >= 0.5;
    }

    var getNumberFromRowColumn = function (n, r, c) {
        return (n * r) + c;
    }

    var createTile = function (color) {// color is bool; true = light; false = dark
        var node = $("<div></div>").addClass("tile");

        if (color) {
            node.addClass("bg-light");
        } else {
            node.addClass("bg-dark");
        }

        return node;
    }

    var setTileColor = function (node, color) {
        if (color) {
            node.removeClass("bg-dark");
            node.addClass("bg-light");
        } else {
            node.removeClass("bg-light");
            node.addClass("bg-dark");
        }
    }

    var swapTileColor = function (node) {
        setTileColor(node, node.hasClass("bg-dark"));
    }

    var createRandomGrid = function (n) {
        var body = $("#tile-grid-body");

        for (i = 0; i < n; i++) {
            var row = $("<tr></tr>");

            for (j = 0; j < n; j++) {
                var tile = createTile(randomBool()).attr('id', `tile-${getNumberFromRowColumn(n, i, j)}`);
                var data = $("<td></td>").append(tile);

                row.append(data);
            }

            body.append(row);
        }
    }

    createRandomGrid(6);
});
