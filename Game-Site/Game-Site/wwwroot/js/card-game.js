"use strict;"

// Code adapted from https://www.geeksforgeeks.org/hopcroft-karp-algorithm-for-maximum-matching-set-2-implementation/, adapted 5/27/19, lines 14-161
// BipGraph is abbreviation for Bipartite graph
// Note: 1-based indices used for the vertices, be sure to convert in Play.xaml.cs!!!
class BipGraph {
    // Number of vertices on the left side of the graph
//    m;
    // Number of vertices on the right side of the graph
//    n;
    // adj[u] is the list of vertices adjacent to u, including 0, the dummy vertex
//    adj;
    // pairU[u] is the vertex on the right side of the graph, connected to u on the left side
//    pairU;
    // pairV[v] is the vertex on the left side of the graph, connected to v on the right side
//    pairV;
//    dist;
    // Constructor
    constructor(m, n) {
        this.m = m;
        this.n = n;
        this.adj = new Array();
        for (var i = 0; i <= m; i++) {
            this.adj.push(new Array());
        }
    }
    // Add an edge from u to v and v to u, avoiding duplicates
    AddEdge(u, v) {
        if (!this.adj[u].includes(v)) {
            this.adj[u].push(v);
        }
    }
    // Clear vertex u's edges
    ClearVertex(u) {
        this.adj[u] = new Array();
    }
    // Clear vertex v's edges where v is on the right
    // This is used because once a card is selected to be a certain number, other cards cannot also be that number
    ClearEdge(u, v) {
        if (this.adj[u].includes(v)) {
            this.adj[u].splice(this.adj[u].indexOf(v), 1);
        }
    }

    // Checks to see if the two vertices are connected by a pair of edges
    hasEdge(u, v) {
        return this.adj[u].includes(v);
    }
    // Runs Hopcroft-Karp algorithm, returns pairU
    HopcroftKarp() {
        this.pairU = new Array(this.m + 1);
        this.pairV = new Array(this.n + 1);
        this.dist = new Array(this.m + 1);
        for (var u = 0; u < this.m + 1; u++) {
            this.pairU[u] = 0;
        }
        for (var v = 0; v < this.n + 1; v++) {
            this.pairV[v] = 0;
        }
        var result = 0;
        var counter = 0;
        while (this.HasAugmentingPath()) {
            counter++;
            console.log("ITERATION: " + counter);
            // Shuffle the order in which the cards are chosen for dfs, to randomize the cards
            var order = Array();
            for (var i = 1; i <= this.m; i++) {
                order.push(i);
            }
            this.Shuffle(order);
            for (var u = 0; u < this.m; u++) {
                // Finding an augmenting path starting from u on the left side of the graph
                if (this.pairU[order[u]] == 0 && this.dfs(order[u])) {
                    result++;
                }
            }
        }
        return this.pairU;
    }
    // Returns true if there is an augmenting path (alternating path starting and ending with free vertex), false otherwise
    HasAugmentingPath() {
        // For randomness, we shuffle the cards before each dequeue

        var queue = new Array();
        // First layer of vertices
        for (var u = 1; u <= this.m; u++) {
            // If it's a free vertex, add it to the queue
            if (this.pairU[u] == 0) {
                this.dist[u] = 0;
                queue.push(u);
            } else {
                this.dist[u] = Number.MAX_VALUE;
            }
        }
        this.dist[0] = Number.MAX_VALUE;
        // queue contains vertices from the left side only
        while (queue.length != 0) {
            // Dequeue a vertex
            var u = queue.shift();
            if (this.dist[u] < this.dist[0]) {
                for (var i of this.adj[u]) {
                    // If the pair of i is not considered then the distance to pairV[i] is infinite, and (i, pairV[i]) is not an explored edge
                    if (this.dist[this.pairV[i]] == Number.MAX_VALUE) {
                        this.dist[this.pairV[i]] = this.dist[u] + 1;
                        queue.push(this.pairV[i]);
                    }
                }
            }
        }
        var isMaxValue = (this.dist[0] !== Number.MAX_VALUE);
        return isMaxValue;
    }
    // Returns true if there exists an augmenting path beginning with free vertex u
    dfs(u) {
        if (u != 0) {
            // To randomize order adjacent vertices get visited in
            this.Shuffle(this.adj[u]);
            for (var i of this.adj[u]) {
                if (this.dist[this.pairV[i]] == this.dist[u] + 1) {
                    if (this.dfs(this.pairV[i])) {
                        this.pairV[i] = u;
                        this.pairU[u] = i;
                        return true;
                    }
                }
            }
            this.dist[u] = Number.MAX_VALUE;
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

    var G;
    
    // Functions

    var setupGame = function () {
        cards = [];
        selectedCards = [];
        turnedOver = false;

        // n must be even
        n = 18;
        k = 3;

        G = new BipGraph(n, n);
        for (var i = 1; i <= n; i++)
        {
            for (var j = 1; j <= n; j++)
            {
                G.AddEdge(i, j);
            }
        }

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

        // shuffle(indexes);

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

    // Create a card (initial value upon creation is unknown but we set it to -1)
    var createCard = function (n, width, height) {
        var node = $("<div></div>")
            .attr("id", `${n}`)
            .attr("card-num", -36)
            .addClass("game-card game-card-active bg-dark")
            .attr("style", `width: ${width}px; height: ${height}px;`)
            .append($("<h2></h2>")
                .addClass("game-card-text text-light")
                .text("?")
            );
        
        return node;
    }

    // Redirects to selectCard() or deselectCard() based on whether it is selected already
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

    // Turn the card from deselected to selected
    var selectCard = function (card) {
        selectedCards.push(card.attr("id"));
        
        // Start 'Selected effects
        card.toggleClass("bg-dark", false);
        card.toggleClass("bg-primary", true);

        if (selectedCards.length == k) {
            enableButton();
        }
    }

    // Turn the card from selected to deselected
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

    // Deselect all cards
    var deselectAll = function () {
        while (selectedCards.length > 0) {
            deselectCard($(`#${selectedCards[0]}`));
        }
    }

    // will not use
    /*
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
    */

    var turnUpAll = function () {
        turnedOver = true;
        // This is the temporary bipartite graph, connecting the chosen cards to the possible values they can be
        // We ignore the cards which were not chosen, so they will not have connections and will not affect the algorithm
        var GTemp = new BipGraph(n, n / 2);
        for (var i = 0; i < selectedCards.length; i++) {
            var index = parseInt(selectedCards[i]);
            // For each vertex adjacent to i in G, add a connection in GTemp
            for (var j of G.adj[index + 1]) {
                GTemp.AddEdge(index + 1, (j - 1) % (n/2) + 1);
            }
            
        }
        var adjChosen = GTemp.HopcroftKarp();
        console.log(adjChosen.toString());
        console.log("HIHI");
        // Check if all chosen cards can have a unique value.
        // If they can, we are basically done. Otherwise, we need to do another Hopcroft Karp, this time where duplicate values are allowed
        var valid = true;
        for (var i = 0; i < selectedCards.length; i++) {
            var index = parseInt(selectedCards[i]);
            // Adding 1 for 1-based indices
            if (adjChosen[index + 1] == 0) {
                valid = false;
                break;
            }
        }
        if (valid) {
            // Set and store the values chosen to the cards
            var values = new Set();
            for (var i = 0; i < selectedCards.length; i++) {
                var index = parseInt(selectedCards[i]);

                if (G.hasEdge(index + 1, adjChosen[index + 1])) {
                    values.add(adjChosen[index + 1]);
                } else {
                    values.add(adjChosen[index + 1] + (n/2));
                }
                // Now set the value of the card
                var id = index.toString();
                $(`#${id}`).attr("card-num", adjChosen[index + 1].toString());
            }
            for (var i = 0; i < selectedCards.length; i++) {
                var index = parseInt(selectedCards[i]);
                G.ClearVertex(i + 1);
                for(var j of values) {
                    G.AddEdge(i + 1, j);
                }
            }
            // We cannot let non-chosen cards take on the value of a chosen card
            for (var i = 0; i < n; i++)
            {
                if (!isSelected(i)) {
                    for(var j of values)
                    {
                        G.ClearEdge(i + 1, j);
                    }
                }
            }
            for (var i = 0; i < selectedCards.length; i++) {
                var currentCard = $(`#${selectedCards[i]}`);
                turnUpCard(currentCard);
            }
            return;
        }
        console.log("win");
        // If we are here, we know that it wasn't valid, so we know that we lost
        // We decide the values of the cards using Hopcroft-Karp again on the graph counting duplicates
        // Using a different BipGraph because the number of possible values of cards is now different
        var GTemp2 = new BipGraph(n, n);
        for (var i = 0; i < selectedCards.length; i++) {
            var index = parseInt(selectedCards[i]);
            // For each vertex adjacent to index in G, add a connection in GTemp
            for(var adj of G.adj[index + 1]) {
                GTemp2.AddEdge(index + 1, adj);
            }
        }
        var adjChosen2 = GTemp2.HopcroftKarp();
        // We know the user won, so we don't have to shuffle cards anymore
        for (var i = 0; i < selectedCards.length; i++) {
            var index = parseInt(selectedCards[i]);
            var id = index.toString();
            $(`#${id}`).attr("card-num", (((adjChosen2[index + 1] - 1) % (n/2)) + 1));
        }
        for (var i = 0; i < selectedCards.length; i++) {
            var currentCard = $(`#${selectedCards[i]}`);
            turnUpCard(currentCard);
        }
        onWin();
    }

    var isSelected = function (val) {
        for (var card of selectedCards) {
            if (parseInt(card) == val) {
                return true;
            }
        }
        return false;
    }

    // Turn up the card
    var turnUpCard = function (card) {
        card.children(".game-card-text").text(card.attr("card-num"));
    }

    // Turn over all cards and shuffle them in place
    var turnDownAll = function () {
        turnedOver = false;

        for (var i = 0; i < selectedCards.length; i++) {
            var card = $(`#${selectedCards[i]}`);
            turnDownCard(card);
        }

        // Shuffle cards
//        for (var i = selectedCards.length - 1; i > 1; i--) {
//            var j = Math.floor(Math.random() * (i + 1));
//
//            var idA = selectedCards[i];
//            var idB = selectedCards[j];
//
//            swap($(`#${idA}`).parent(), $(`#${idB}`).parent());
//        }

        deselectAll();
        disableButton();
    }

    // Will not use
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

    // Turn over the card
    var turnDownCard = function (card) {
        card.children(".game-card-text").text("?");
    }

    // Highlight the two cards with the same number which were selected in event of win
    var highlightCard = function (card) {
        card.toggleClass("bg-dark", false);
        card.toggleClass("bg-primary", false);
        card.toggleClass("bg-warning", true);
        card.toggleClass("game-card-active", false);
        card.toggleClass("game-card-win", true);
    }

    // Enable the button, allowing the user to turn over when k cards have been selected
    var enableButton = function () {
        turnOverButton.toggleClass("disabled", false);
        turnOverButton.removeAttr("disabled");
        turnOverButton.click(buttonClicked);
    }

    // Disable the button if the user should not be allowed to click it
    var disableButton = function () {
        turnOverButton.toggleClass("disabled", true);
        turnOverButton.attr("disabled", "disabled");
        turnOverButton.off("click");
    }

    // Toggle selected cards when button is clicked
    var buttonClicked = function () {
        if (turnedOver) {
            turnDownAll();
        } else {
            turnUpAll();
        }
    }

    // When the user wins, run the onWin sequence
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

    // Restart when restart button is clicked
    $('#restart-button').click(function () {
        setupGame();
    });

    turnOverButton.click(buttonClicked);

    // Start
    setupGame();
});

