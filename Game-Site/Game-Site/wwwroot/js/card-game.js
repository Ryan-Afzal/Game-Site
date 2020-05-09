"use strict;"

$('document').ready(function () {
    // jQuery Objects
    var settingsModal = $("#settingsModal");
    var settingsOk = $("#settingsModalOk");
    var turnOverButton = $("#turn-over-button");

    // Variables
    var cards;
    var selectedCards;// Array of IDs of selected cards

    var turnedOver;

    var n;
    var k;

    // Functions

    var setupGame = function () {
        cards = [];
        selectedCards = [];
        turnedOver = false;

        n = 18;
        k = 4;

        $("#win-alert").empty();
        $('#restart-button').toggleClass("btn-danger", true).toggleClass("btn-success", false);
        disableButton();

        createCardDeck();
    }

    var createCardDeck = function () {
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
                    cardClicked($(this));
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
        var node = $("<div></div>")
            .attr("id", `card-${n}`)
            .attr("card-num", Math.floor(n / 2) + 1)
            .addClass("game-card bg-dark")
            .attr("style", `width: ${width}px; height: ${height}px;`)
            .append($("<h2></h2>")
                .addClass("game-card-text text-light")
                .text("?")
            );
        
        return node;
    }

    var cardClicked = function (card) {
        if (!turnedOver) {
            if (selectedCards.indexOf(card.attr("id")) == -1) {
                if (selectedCards.length < k) {
                    selectCard(card);
                }
            } else {
                deselectCard(card);
            }
        }
    }

    var selectCard = function (card) {
        selectedCards.push(card.attr("id"));
        
        // Start 'Selected effects
        card.toggleClass("bg-dark", false);
        card.toggleClass("bg-primary", true);

        if (selectedCards.length == k) {
            enableButton();
        }
    }

    var deselectCard = function (card) {
        var index = selectedCards.indexOf(card.attr("id"));
        selectedCards.splice(index, 1);

        // Stop 'Selected' effects
        card.toggleClass("bg-dark", true);
        card.toggleClass("bg-primary", false);

        if (selectedCards.length < k) {
            disableButton();
        }
    }

    var deselectAll = function () {
        while (selectedCards.length > 0) {
            deselectCard($(`#${selectedCards[0]}`));
        }
    }

    var turnUpAll = function () {
        turnedOver = true;
        var checkedIDs = [];
        var win = false;

        for (var i = 0; i < selectedCards.length; i++) {
            var currentID = selectedCards[i];
            var currentCard = $(`#${currentID}`);
            var currentCardNum = currentCard.attr("card-num");

            var equalCardID = checkedIDs.find((id) => {
                return $(`#${id}`).attr("card-num") == currentCardNum;
            });

            if (equalCardID != undefined) {
                win = true;
                highlightCard(currentCard);
                highlightCard($(`#${equalCardID}`));
            }

            checkedIDs.push(currentID);
            turnUpCard(currentCard);
        }

        if (win) {
            onWin();
        }
    }

    var turnUpCard = function (card) {
        card.children(".game-card-text").text(card.attr("card-num"));
    }

    var turnDownAll = function () {
        turnedOver = false;

        for (var i = 0; i < selectedCards.length; i++) {
            var card = $(`#${selectedCards[i]}`);
            turnDownCard(card);
        }

        // Shuffle cards

        deselectAll();
        disableButton();
    }

    var turnDownCard = function (card) {
        card.children(".game-card-text").text("?");
    }

    var highlightCard = function (card) {
        card.toggleClass("bg-dark", false);
        card.toggleClass("bg-primary", false);
        card.toggleClass("bg-warning", true);
    }

    var enableButton = function () {
        turnOverButton.toggleClass("disabled", false);
        turnOverButton.removeAttr("disabled");
    }

    var disableButton = function () {
        turnOverButton.toggleClass("disabled", true);
        turnOverButton.attr("disabled", "disabled");
    }

    var buttonClicked = function () {
        if (turnedOver) {
            turnDownAll();
        } else {
            turnUpAll();
        }
    }

    var onWin = function () {
        var body = $("<div></div>")
            .addClass("card-body text-center")
            .append($("<h3></h3>")
                .addClass("card-title text-success text-center")
                .text("You win!")
            );

        var card = $("<div></div>")
            .addClass("card")
            .append(body);

        $('#win-alert').append(card);

        disableButton();
        $('#restart-button').toggleClass("btn-danger", false).toggleClass("btn-success", true);
    }

    $('#restart-button').click(function () {
        setupGame();
    });

    turnOverButton.click(buttonClicked);

    // Start
    setupGame();
});
