"use strict";

const apiURI = 'Rankings/api/Vote';
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function choose(x, y) {
    console.log(x + " beat " + y);

    const body = {
        "Winner": x, "Loser": y
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
            processResponse(data.response);
        });


    // Generate new elements
    var length = states.length;
    var a = getRandomInt(length);
    var b = getRandomInt(length - 1);
    if (b >= a) {
        b++;
    }
    document.querySelector("#thing1").innerText = states[a];
    document.querySelector("#thing2").innerText = states[b];
}
function win12() {
    choose(document.querySelector("#thing1").innerText, document.querySelector("#thing2").innerText);
}
function win21() {
    choose(document.querySelector("#thing2").innerText, document.querySelector("#thing1").innerText);
}
function processResponse(response) {
    var words = response.split(" ");
    document.getElementById("winresult").innerText = words[0];
    document.getElementById("loseresult").innerText = words[1];
}
document.getElementById("thing1").onclick();
var a = getRandomInt(length);