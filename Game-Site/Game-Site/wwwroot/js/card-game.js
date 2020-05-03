"use strict;"

$('document').ready(function () {
    var settingsModal = $("#settingsModal");
    var settingsOk = $("#settingsModalOk");

    var cards = [];
    var selectedCards = [];

    var n = 18;
    var k = 4;

    // Create card #n.
    var createCard = function (n, width, height) {
        //throw new DOMException();
        var node = $("<div></div>")
            .attr("id", `card-${n}`)
            .attr("card-num", Math.floor(n / 2) + 1)
            .addClass("game-card bg-dark")
            .attr("style", `width: ${width}px; height: ${height}px;`);

        return node;
    }

    // Populates the card grid with n cards
    var createCardDeck = function () {
        cards = [];
        selectedCards = [];

        var column = $("#card-grid-col");
        var grid = $("#card-grid");
        var body = $("#card-grid-body");
        body.empty();

        var rows = 3;
        var cols = 6;

        var i = 0;

        var width = column.width();
        var spacing = grid.attr('cellspacing');
        var padding = grid.attr('cellpadding');

        var width = (width - (padding * 2 * cols) - (spacing * (cols - 1))) / cols;
        var height = width * 3 / 2;

        for (var r = 0; r < rows; r++) {
            var row = $("<tr></tr>");

            for (var c = 0; c < cols; c++) {
                var card = createCard(i, width, height);

                card.click(function () {

                });

                cards.push(card);

                row.append(
                    $("<td></td>")
                    .append(card)
                );

                i++;
            }

            body.append(row);
        }
    }

    var shuffle = function (cards) {
        throw new DOMException();
    }

    var selectCard = function (card) {// Select a card

    }

    var turnOverCards = function () {// Turns over selected k cards.

    }

    var shuffleCards = function () {// Turns selected cards over, deselects them, and shuffles them.

    }

    var win = function () {

    }

    createCardDeck();

    //settingsModal.modal('show');
});
