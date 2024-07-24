// Array to hold the cards
var cardList = [];

// Function to create the cards
function SpawnCards() {
    var cardArea = document.getElementById("divCards");
    // 6 cards
    for (var i = 0; i < 6; i++) {
        // Create a new card div and set the id
        var card = document.createElement("div");
        card.setAttribute("id", i);
        
        // Function to add event listener
        // Contain this within a function itself in order to keep each card and listener separate
        addListener(card);

        // Assign css class to each square and default color to the front side
        card.classList.add("card");
        card.classList.add("card-front");

        // Add the card to the div
        cardArea.appendChild(card);

        // Add the card to the array
        cardList.push(card);
    }
}
    
// Function to flip the cards
function flipCard(card) {
    // Get which side the card is on
    var side = card.classList[1];

    // Reset background color
    card.style.backgroundColor = '';

    // If it is front facing, turn to the back
    if (side == "card-front") {
        card.classList.remove("card-front");
        card.classList.add("card-back");
    }
    else {  // Otherwise, do the opposite
        card.classList.remove("card-back");
        card.classList.add("card-front");
    }

    // Add a 1 to the score
    editScore(1);
}

// Add a listener to the card as a function - listener will listen for a click to flip the card
function addListener(card) {
    card.addEventListener("click", function() { flipCard(card); })
}

// Function that handles a double click event
function dontClick() {
    // Alert the user
    alert("I said don't click!")
    alert("Now the cards are different colors.")

    // For each card in the array, change the background color to random rgb values
    for (var i = 0; i < cardList.length; i++) {
        var r = Math.random() * (255 - 0);
        var g = Math.random() * (255 - 0);
        var b = Math.random() * (255 - 0);
        cardList[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}

// Function that handles the mouse scroll event over the score
function mouseScroll() {
    // Add 5 to the score
    editScore(5);
}

// Update the score
function updateScore(newScore) {
    document.getElementById("score").textContent = newScore;
}

// Edit the score value
function editScore(amountToEdit) {
    // Get a reference to the span value
    var scoreSpan = document.getElementById("score");
    // Get the numerical value of the span
    var newScore = parseInt(scoreSpan.textContent);
    // Add the incoming amount to edit the score by
    newScore += amountToEdit;
    // Update the score on the page
    updateScore(newScore);
}

// Spawn the cards
SpawnCards();