"use strict";

/**********************
 * © Lin Alg Calculator 2020 *
 **********************/

const apiURI = 'api/Calculator';// Calculator API URI

$(document).ready(function () {
    getConsoleInput(true).keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !event.shiftKey) {
            var node = getConsoleInput(false);
            var input = node.textContent;

            if (input.trim() == "") {
                // Do Nothing
            } else {
                node.textContent = "";

                printInput(input);
                getResult(input, processResponse);

                event.preventDefault();
            }
        }
    });
});


/*
 * Sends a POST request to the API and calls the callback function with the returned JSON result.
 */
function getResult(input, callback) {
    var strings = [];
    var i = 0;

    strings[i] = input;

    const body = {
        input: strings
    };

    fetch(`${apiURI}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(data => {
            ;
            callback(data.response);
        })
        .catch(error => {
            console.error('ERROR', error);
        });
}

/*
 * Prints a message to the console.
 */
function printMessage(head, message) {
    var output = getConsoleOutput();

    output.append(
        $('<div />').addClass("output-text-container")
            .append(
                $('<div />').addClass("output-text-head").text(head)
            )
            .append(
                $('<div />').addClass("output-text").text(message)
            )
    );

    $("#console-output-container").scrollTop(output[0].scrollHeight);
}

/*
 * Prints a message formatted as a user input.
 */
function printInput(input) {
    printMessage("", input);
}

/*
 * Prints a message formatted as a returned API response.
 */
function printOutput(output) {
    printMessage("🠖", output);
}

/*
 * Processes a returned API response.
 */
function processResponse(response) {
    var equals = response.indexOf('=');

    if (equals == -1) {
        var index = response.indexOf("\n");
        if (index == -1) {
            printOutput(response);
        } else {
            var string = response;
            do {
                var sub = string.substring(0, index);
                printOutput(sub);
                string = string.substring(index + 1);
                index = string.indexOf("\n");
            } while (index != -1);

            printOutput(string);
        }
    } else {
        var head = response.substring(0, equals);
        var body = response.substring(equals + 1);

        var paren = head.indexOf('(');

        if (paren == -1) {
            variables[head] = body;
            putVariable(head, body);
        } else {
            functions[head] = body;
            putFunction(head, body);
        }

        printOutput(response);
    }
}

/*
 * Returns the console output.
 */
function getConsoleOutput() {
    return $("#console-output");
}

/*
 * Returns the console input. Contains a boolean parameter to determine whether to return a JQuery object or a regular DOM object.
 * This distinction is useful in certain scenarios.
 */
function getConsoleInput(jQuery) {
    if (jQuery) {
        return $("#console-input");
    } else {
        return document.getElementById("console-input");
    }
}
