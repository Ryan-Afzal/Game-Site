"use strict;"

$('document').ready(function () {
    // jQuery Objects
    var settingsModal = $("#settingsModal");
    var settingsOk = $("#settingsModalOk");
    var turnOverButton = $("#turn-over-button");

    // Variables
    var cards = [];
    var selectedCards = [];

    var turnedOver = false;

    var n = 18;
    var k = 4;

    // Functions

    var setupGame = function () {
        n = 18;
        k = 4;
        turnedOver = false;

        turnOverButton.click(buttonClicked);

        createCardDeck();
    }

    var createCardDeck = function () {
        cards = [];
        selectedCards = [];
        turnedOver = false;

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
                    cardClicked(this);
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

    var createCard = function (n, width, height) {
        //throw new DOMException();
        var node = $("<div></div>")
            .attr("id", `card-${n}`)
            .attr("card-num", Math.floor(n / 2) + 1)
            .addClass("game-card bg-dark")
            .attr("style", `width: ${width}px; height: ${height}px;`);

        return node;
    }

    var cardClicked = function (card) {
        if (!turnedOver) {
            if (selectedCards.indexOf(card) == -1) {
                selectCard(card);
            } else {
                deselectCard(card);
            }
        }
    }

    var selectCard = function (card) {
        selectedCards.push(card);

        // Start 'Selected effects
    }

    var deselectCard = function (card) {
        var index = selectedCards.indexOf(card);
        selectedCards.splice(index, 1);

        // Stop 'Selected' effects
    }

    var buttonClicked = function () {

    }

    // Start
    setupGame();

    //settingsModal.modal('show');
});
