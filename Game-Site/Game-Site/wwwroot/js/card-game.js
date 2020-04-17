"use strict;"

$('document').ready(function () {
    var settingsModal = $("#settingsModal");
    var settingsOk = $("#settingsModalOk");

    // Create a card with the specified number.
    var createCard = function (num) {
        var card = $("<div></div>")
            .addClass("card bg-dark text-light")
            .append($("<div></div>")
                .addClass("card-body")
                .append($("<p></p>")
                    .addClass("card-title display-4 text-center")
                    .text(num)
            )
        );

        return card;
    }

    // Create a card deck going up to the specified number.
    // A deck consists of n pairs of cards numbering 1-n.
    var createCardDeck = function (n) {
        var deck = $("<div></div>")
            .addClass("row row-cols-2 row-cols-md-2");

        for (i = 2; i <= 2*n; i++) {
            deck.append($("<div></div>")
                .addClass("col mb-4")
                .append(createCard(Math.floor(i / 2)))
            );
        }

        return deck;
    }

    $("#cardContainer").append(createCardDeck(10));

    //settingsModal.modal('show');
});
