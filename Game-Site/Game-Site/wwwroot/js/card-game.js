"use strict;"

$('document').ready(function () {
    // jQuery Objects
    var settingsModal = $("#settingsModal");
    var settingsOk = $("#settingsModalOk");
    var turnOverButton = $("#turn-over-button");

    // Variables
    var cards;
    var selectedCards;

    var turnedOver;

    var n;
    var k;

    // Functions

    var setupGame = function () {
        n = 18;
        k = 4;

        turnOverButton.click(buttonClicked);
        disableButton();

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
        //throw new DOMException();
        var node = $("<div></div>")
            .attr("id", `card-${n}`)
            .attr("card-num", Math.floor(n / 2) + 1)
            .addClass("game-card bg-dark")
            .attr("style", `width: ${width}px; height: ${height}px;`)
            .append($("<h5></h5>")
                .addClass("game-card-text text-light text-center")
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
        var nums = [];
        var win = false;

        for (var i = 0; i < selectedCards.length; i++) {
            var card = $(`#${selectedCards[i]}`);
            var cardNum = card.attr("card-num");

            var equalCard = nums.find((id) => {
                $(`#${id}`).attr("card-num") == cardNum;
            });

            if (equalCard != undefined) {
                win = true;
                highlightCard(card);
                highlightCard($(`#${equalCard}`));
            }

            nums.push(card.attr("id"));

            turnUpCard(card);
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

        deselectAll();
        disableButton();
    }

    var turnDownCard = function (card) {
        card.children(".game-card-text").text("?");
    }

    var highlightCard = function (card) {
        console.log(card.attr("id"));
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
        console.log("You Win!");
    }

    // Start
    setupGame();

    //settingsModal.modal('show');
});
