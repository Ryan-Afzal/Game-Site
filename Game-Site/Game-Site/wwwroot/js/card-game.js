"use strict;"

// Shuffle the array
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

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
        k = 3;

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

        var width = column.width();
        var spacing = grid.attr('cellspacing');
        var padding = grid.attr('cellpadding');

        var width = (width - (padding * 2 * cols) - (spacing * (cols - 1))) / cols;
        var height = width * 3 / 2;

        var indexes = [...Array(rows * cols).keys()];

        shuffle(indexes);

        var i = 0;

        for (var r = 0; r < rows; r++) {
            var row = $("<tr></tr>");

            for (var c = 0; c < cols; c++) {
                var card = createCard(indexes[i], width, height);

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
            .addClass("game-card game-card-active bg-dark")
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
        for (var i = selectedCards.length - 1; i > 1; i--) {
            var j = Math.floor(Math.random() * (i + 1));

            var idA = selectedCards[i];
            var idB = selectedCards[j];

            swap($(`#${idA}`).parent(), $(`#${idB}`).parent());
        }

        deselectAll();
        disableButton();
    }

    var swap = function (elementA, elementB) {
        var parentA = elementA.parent();
        var indexA = parentA.children().index(elementA);
        
        elementA.insertAfter(elementB);
        
        if (indexA == 0) {
            elementB.insertBefore(parentA.children().get(0));
        } else {
            elementB.insertAfter(parentA.children().get(indexA - 1));
        }
    }

    var turnDownCard = function (card) {
        card.children(".game-card-text").text("?");
    }

    var highlightCard = function (card) {
        card.toggleClass("bg-dark", false);
        card.toggleClass("bg-primary", false);
        card.toggleClass("bg-warning", true);
        card.toggleClass("game-card-active", false);
        card.toggleClass("game-card-win", true);
    }

    var enableButton = function () {
        turnOverButton.toggleClass("disabled", false);
        turnOverButton.removeAttr("disabled");
        turnOverButton.click(buttonClicked);
    }

    var disableButton = function () {
        turnOverButton.toggleClass("disabled", true);
        turnOverButton.attr("disabled", "disabled");
        turnOverButton.off("click");
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

// Code adapted from https://www.geeksforgeeks.org/hopcroft-karp-algorithm-for-maximum-matching-set-2-implementation/, adapted 5/27/19, lines 14-161
// BipGraph is abbreviation for Bipartite graph
// Note: 1-based indices used for the vertices, be sure to convert in Play.xaml.cs!!!
class BipGraph {
    // Number of vertices on the left side of the graph
    m;
    // Number of vertices on the right side of the graph
    n;
    // adj[u] is the list of vertices adjacent to u, including 0, the dummy vertex
    adj;
    // pairU[u] is the vertex on the right side of the graph, connected to u on the left side
    pairU;
    // pairV[v] is the vertex on the left side of the graph, connected to v on the right side
    pairV;
    dist;
    // Constructor
    BipGraph(m, n) {
        this.m = m;
        this.n = n;
        adj = new Array();
        for (var i = 0; i <= m; i++) {
            adj.push(new Array());
        }
    }
    // Add an edge from u to v and v to u, avoiding duplicates
    AddEdge(u, v) {
        if (!adj[u].includes(v)) {
            adj[u].push(v);
        }
    }
    // Clear vertex u's edges
    ClearVertex(u) {
        adj[u] = new Array();
    }
    // Clear vertex v's edges where v is on the right
    // This is used because once a card is selected to be a certain number, other cards cannot also be that number
    ClearEdge(u, v) {
        if (adj[u].includes(v)) {
            adj[u].splice(adj[u].indexOf(v), 1);
        }
    }

    // Checks to see if the two vertices are connected by a pair of edges
    hasEdge(u, v) {
        return adj[u].includes(v);
    }
    // Runs Hopcroft-Karp algorithm, returns pairU
    HopcroftKarp() {
        pairU = new Array(m + 1);
        pairV = new Array(n + 1);
        dist = new Array(m + 1);
        for (var u = 0; u < m + 1; u++) {
            pairU[u] = 0;
        }
        for (var v = 0; v < n + 1; v++) {
            pairV[v] = 0;
        }
        var result = 0;
        while (HasAugmentingPath()) {
            // Shuffle the order in which the cards are chosen for dfs, to randomize the cards
            var order = Array();
            for (var i = 1; i <= m; i++) {
                order.push(i);
            }
            Shuffle(order);
            for (var u = 0; u < m; u++) {
                // Finding an augmenting path starting from u on the left side of the graph
                if (pairU[order[u]] == 0 && dfs(order[u])) {
                    result++;
                }
            }
        }
        return pairU;
    }
    // Returns true if there is an augmenting path (alternating path starting and ending with free vertex), false otherwise
    HasAugmentingPath() {
        // For randomness, we shuffle the cards before each dequeue

        var queue = new Array();
        // First layer of vertices
        for (var u = 1; u <= m; u++) {
            // If it's a free vertex, add it to the queue
            if (pairU[u] == 0) {
                dist[u] = 0;
                queue.push(u);
            } else {
                dist[u] = Number.MAX_VALUE;
            }
        }
        dist[0] = Number.MAX_VALUE;
        // queue contains vertices from the left side only
        while (queue.length != 0) {
            // Dequeue a vertex
            var u = queue.shift();
            if (dist[u] < dist[0]) {
                for (var i = 0; i < adj[u].length; i++) {
                    // If the pair of i is not considered then the distance to pairV[i] is infinite, and (i, pairV[i]) is not an explored edge
                    if (dist[pairV[adj[i]]] == Number.MAX_VALUE) {
                        dist[pairV[adj[i]]] = dist[u] + 1;
                        queue.push(pairV[adj[i]]);
                    }
                }
            }
        }
        var isMaxValue = (dist[0] !== Number.MAX_VALUE);
        return isMaxValue;
    }
    // Returns true if there exists an augmenting path beginning with free vertex u
    dfs(u) {
        if (u != 0) {
            // To randomize order adjacent vertices get visited in
            Shuffle(adj[u]);
            for (var i = 0; i < adj[u].length; i++) {
                if (dist[pairV[adj[i]]] == dist[u] + 1) {
                    if (dfs(pairV[adj[i]])) {
                        pairV[adj[i]] = u;
                        pairU[u] = adj[i];
                        return true;
                    }
                }
            }
            dist[u] = Number.MAX_VALUE;
            return false;
        }
        return true;
    }

    // Shuffling a list, code from https://stackoverflow.com/questions/273313/randomize-a-listt, copied 5/28/19, lines 164-176
    Shuffle(list) {
        var n = list.length;
        while (n > 1) {
            n--;
            var k = Math.floor(Math.random() * (n + 1));
            var value = list[k];
            list[k] = list[n];
            list[n] = value;
        }
    }
}