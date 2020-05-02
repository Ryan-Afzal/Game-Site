"use strict;"

$('document').ready(function () {
    var settingsModal = $("#settingsModal");
    var settingsOk = $("#settingsModalOk");

    var cards = [];
    var selectedCards = [];

    var n = 15;
    var k = 4;

    // Create card #n.
    var createCard = function (n) {
        throw new DOMException();
    }

    // Populates the card grid with n cards
    var createCardDeck = function () {
        var cards = [];
        var selectedCards = [];

        var column = $("#card-grid-col");

        var body = $("#card-grid-body");
        body.empty();

        var numCards = n * 2;
        var rows = 5;
        var cols = 6;

        var i = 0;

        for (var r = 0; r < rows; r++) {
            var row = $("<tr></tr>");

            for (var c = 0; c < cols; c++) {
                var card = createCard(i);

                cards.append(card);

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

    createCardDeck();

    //settingsModal.modal('show');
});
