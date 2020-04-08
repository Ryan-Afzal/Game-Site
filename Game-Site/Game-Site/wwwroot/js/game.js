$('document').ready(function () {
    var level = {
        active: true,
        set: new Set()
    };

    var win = function () {
        level.active = false;
        $('#win-alert').show();
    }

    var randomBool = function () {
        return Math.random() >= 0.5;
    }

    var getNumberFromRowColumn = function (n, r, c) {
        return (n * r) + c;
    }

    var createTile = function (n, r, c, color) {// color is bool; true = light; false = dark
        var node = $("<div></div>")
            .addClass("tile")
            .attr('id', `tile-${getNumberFromRowColumn(n, r, c)}`)
            .attr('tile-r', r)
            .attr('tile-c', c);;

        if (color) {
            node.addClass("bg-light");
        } else {
            node.addClass("bg-dark");
            level.set.add(node.attr('id'));
        }

        return node;
    }

    var setTileColor = function (node, color) {
        if (color) {
            node.removeClass("bg-dark");
            node.addClass("bg-light");
            level.set.delete(node.attr('id'));
        } else {
            node.removeClass("bg-light");
            node.addClass("bg-dark");
            level.set.add(node.attr('id'));
        }
    }

    var swapTileColor = function (node) {
        setTileColor(node, node.hasClass("bg-dark"));
    }

    var swapRowColColors = function (n, r, c) {
        if (level.active) {
            for (i = 0; i < c; i++) {
                swapTileColor($(`#tile-${getNumberFromRowColumn(n, r, i)}`));
            }

            for (i = c + 1; i < n; i++) {
                swapTileColor($(`#tile-${getNumberFromRowColumn(n, r, i)}`));
            }

            for (j = 0; j < r; j++) {
                swapTileColor($(`#tile-${getNumberFromRowColumn(n, j, c)}`));
            }

            for (j = r + 1; j < n; j++) {
                swapTileColor($(`#tile-${getNumberFromRowColumn(n, j, c)}`));
            }

            swapTileColor($(`#tile-${getNumberFromRowColumn(n, r, c)}`));
        }
    }

    var createRandomGrid = function (n) {
        var body = $("#tile-grid-body");

        for (r = 0; r < n; r++) {
            var row = $("<tr></tr>");

            for (c = 0; c < n; c++) {
                var tile = createTile(n, r, c, randomBool());
                var data = $("<td></td>").append(tile);

                tile.click(function () {
                    swapRowColColors(
                        n,
                        parseInt(this.getAttribute('tile-r')),
                        parseInt(this.getAttribute('tile-c'))
                    );

                    if (level.set.size == 0) {
                        win();
                    }
                });

                row.append(data);
            }

            body.append(row);
        }

        if (level.set.size == 0) {
            console.log("empty grid, regenerating...");
            createRandomGrid(n);
        }
    }

    $('#win-alert').hide();
    createRandomGrid(2);
});
