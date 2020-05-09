$('document').ready(function () {
    var global_active = false;//Is game active (boolean)
    var global_set = new Set();//Set of black tiles (JS Set)
    var global_n = 0;//Board side length (int)
    var global_minMoves = 0;//Minimum moves required to complete game (int)
    var global_moves = 0;//Moves taken to complete game (int)
    var global_startTime = null;//Start 'Date' in milliseconds since 1970 (int)
    var global_endTime = null;//End 'Date' to complete game in milliseconds since 1970 (int)
    var global_interval = null;//Timer interval (JS object)
    var global_game_moves = null;//Moves label (jQuery object)
    var global_game_timer = $('#game-timer');//Timer label (jQuery object)
    var global_grid = $('#tile-grid');
    var global_grid_col = $('#tile-grid-col');

    var win = function () {
        global_active = false;
        stopTimer();

        var body = $("<div></div>")
            .addClass("card-body text-center")
            .append($("<h3></h3>")
                .addClass("card-title text-success text-center")
                .text("You win!")
            )
            .append($("<p></p>")
                .addClass("card-text text-center")
                .text(`Score: ${score(global_n, global_moves, global_endTime - global_startTime)}`)
            )
            /*.append($("<button></button>")
                .addClass("btn btn-dark")
                .attr("type", "button")
                .attr("data-toggle", "modal")
                .attr("data-target", "#difficultySelect")
                .text("Play Again")
            )*/
            ;

        var card = $("<div></div>")
            .addClass("card")
            .append(body);

        $('#win-alert').append(card);

        $('#restart-button').toggleClass("btn-danger", false).toggleClass("btn-success", true);
    }

    var move = function () {
        global_moves++;
        global_game_moves.text(global_moves);
    }

    var startTimer = function () {
        global_startTime = Date.now();
        clearInterval(global_interval);
        global_interval = setInterval(updateTimer, 1);
    }

    var stopTimer = function () {
        clearInterval(global_interval);
        global_endTime = Date.now();
    }

    var updateTimer = function () {
        global_game_timer.text(timeFromMillis(global_startTime));
    }

    var timeFromMillis = function (startTime) {
        var currentTime = Date.now();
        var time = currentTime - startTime;

        var hours = Math.floor(time / 3600000);
        time %= 3600000;
        var minutes = Math.floor(time / 60000);
        time %= 60000;
        var seconds = Math.floor(time / 1000);
        time %= 1000;
        var milliseconds = time;

        return `${leftPad(hours, 2)}:${leftPad(minutes, 2)}:${leftPad(seconds, 2)}:${leftPad(milliseconds, 3)}`;
    }

    var leftPad = function (num, length) {
        var str = num.toString();

        var d = length - str.length;

        if (d > 0) {
            for (i = 0; i < d; i++) {
                str = '0' + str;
            }
        }

        return str;
    }

    var score = function (n, moves, time) {
        /*
         * 100 * (n^2) * minMoves * minTime
         * --------------------------------
         *          moves * time
         */

        var timePerMove = 1500;
        var minTime = global_minMoves * timePerMove;

        return Math.floor((100 * Math.pow(n, 2) * global_minMoves * minTime) / (moves * time));
    }

    var randomBool = function () {
        return Math.random() >= 0.5;
    }

    var getNumberFromRowColumn = function (n, r, c) {
        return (n * r) + c;
    }

    var createTile = function (n, r, c, color) {// color is bool; true = light; false = dark
        var width = global_grid_col.width();
        var spacing = global_grid.attr('cellspacing');
        var padding = global_grid.attr('cellpadding');

        var size = (width - (padding * 2 * n) - (spacing * (n - 1))) / n;

        var node = $("<div></div>")
            .addClass(`tile`)
            .attr('id', `tile-${getNumberFromRowColumn(n, r, c)}`)
            .attr('style', `width: ${size}px; height: ${size}px;`)
            .attr('tile-r', r)
            .attr('tile-c', c);

        if (color) {
            node.addClass("bg-dark");
            global_set.add(node.attr('id'));
        } else {
            node.addClass("bg-light");
        }

        return node;
    }

    var setTileColor = function (node, color) {
        if (color) {
            node.removeClass("bg-dark");
            node.addClass("bg-light");
            global_set.delete(node.attr('id'));
        } else {
            node.removeClass("bg-light");
            node.addClass("bg-dark");
            global_set.add(node.attr('id'));
        }
    }

    var swapTileColor = function (node) {
        setTileColor(node, node.hasClass("bg-dark"));
    }

    var swapRowColColors = function (n, r, c) {
        if (global_active) {
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

            move();
        }
    }

    var createRandomGrid = function (n) {
        global_set = new Set();
        var arr = [];

        var body = $("#tile-grid-body");
        body.empty();

        for (r = 0; r < n; r++) {
            var row = $("<tr></tr>");

            for (c = 0; c < n; c++) {
                var rand = randomBool();
                arr.push([getNumberFromRowColumn(n, r, c), rand ? 1 : 0]);

                var tile = createTile(n, r, c, rand);
                var data = $("<td></td>").append(tile);

                tile.click(function () {
                    swapRowColColors(
                        n,
                        parseInt(this.getAttribute('tile-r')),
                        parseInt(this.getAttribute('tile-c'))
                    );

                    if (global_active && global_set.size == 0) {
                        win();
                    }
                });

                row.append(data);
            }

            body.append(row);
        }

        if (global_set.size == 0) {
            console.log("empty grid, regenerating...");
            createRandomGrid(n);
        }

        global_active = true;
        global_minMoves = solveGame(n, arr);
    }

    var setupGame = function (n, color) {
        stopTimer();
        global_endTime = null;
        global_interval = null;

        $("#win-alert").empty();
        $('#restart-button').toggleClass("btn-danger", true).toggleClass("btn-success", false);
        createRandomGrid(n);

        global_n = n;
        global_moves = 0;
        global_game_moves = $('#game-moves').text(0);
        $('#game-size')
            .removeClass()
            .addClass(`badge text-light badge-${color}`)
            .text(`${n}\u00D7${n}`);
        startTimer();
    }

    var solveGame = function (n, arr) {// Returns minimum moves required to solve given board
        //Start with two arrays: rows and columns
        var r = [];
        var c = [];

        //Start with them all at 0
        for (var i = 0; i < n; i++) {
            r[i] = 0;
            c[i] = 0;
        }

        // Set each index in the rows and columns to be the number of black tiles in each row/column
        for (var _r = 0; _r < n; _r++) {
            for (var _c = 0; _c < n; _c++) {
                if (arr[getNumberFromRowColumn(n, _r, _c)][1] == 1) {
                    r[_r]++;
                    c[_c]++;
                }
            }
        }

        //A move is required for each tile in the [i, j] grid where r[i] + c[j] + arr[i][j] is odd
        var moves = 0;
        for (var _r = 0; _r < n; _r++) {
            for (var _c = 0; _c < n; _c++) {
                var i = r[_r] + c[_c] + arr[getNumberFromRowColumn(n, _r, _c)][1];
                if (i % 2 == 1) {
                    moves++;
                }
            }
        }

        return moves;
    }

    $('#difficulty-2x2').click(function () {
        setupGame(2, "success");
    });

    $('#difficulty-4x4').click(function () {
        setupGame(4, "info");
    });

    $('#difficulty-6x6').click(function () {
        setupGame(6, "primary");
    });

    $('#difficulty-8x8').click(function () {
        setupGame(8, "warning");
    });

    $('#difficulty-10x10').click(function () {
        setupGame(10, "danger");
    });

    $('#difficultySelect').modal('show');
});
