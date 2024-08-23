var cardList = [];
var cardsSelected = 0;
var selectedCards = [];
var cardSelectedID;
var imageList = ["a_blaze_in_the_northern_sky", "absolvere", "bleed_the_future", "death_atlas", "dethalbum", "eternal_nightmare", "helix", "in_the_nightside_eclipse", "in_waves", "lifeblood", "malignance", "mysteries_of_the_nocturnal_forest", "nightbringers", "pale_swordsman", "prophecy_of_ragnarok", "quiet_place_to_die", "reincarnate", "sacrament_of_sin", "space_1992_rise_of_the_chaos_wizards", "the_great_war", "we_are_going_to_hell", "obscene_repressed", "immortal", "elegy"];
var albumsToUse = [];
var score = 0;


// Function to create the cards
function SpawnCards() {
    var cardArea = document.getElementById("divCards");
    var index;

    // randomly pick the albums that will be used
    pickAlbums();
    
    // Spawn 20 cards    
    for (var i = 0; i < 20; i++) {
        // Build cards
        // Create a new button
        var card = document.createElement("button");

        // Set an id to the card
        card.setAttribute("cardID", i);
        
        // Function to add event listener
        // Contain this with a function itself in order to keep each card and listener separate
        addListener(card);

        // Assign css class to each square that defines the base of a card
        card.className = "card";
        // Add class that styles what cards look like on hover
        card.classList.add("card-front");

        // Generate a random index position for the array of randomly picked albums 
        index = assignAlbum();
        // Set the id of a cards respective album using the randomly generated index
        card.setAttribute("cardsAlbumID", albumsToUse[index]);
        // Remove that album id from the array
        albumsToUse.splice(index, 1);

        // Add the square to the board
        cardArea.appendChild(card);

        // Add the card to the array of cards
        cardList.push(card);
    }
}

// Function to deal with what should happen when a card is selected
function selectCard(card) {
    // Increment the amount of cards that have been selected
    cardsSelected++;

    // Check if there are 3 cards selected
    // 3 cards and not 2 so that they only flip when a new card is selected and not when the second is selected
    if (cardsSelected == 3) {
        // If cards 1 and 2 are not the same album, reset their image
        if (cardList[selectedCards[0]].getAttribute("cardsAlbumID") != cardList[selectedCards[1]].getAttribute("cardsAlbumID"))
            resetFlipped(selectedCards[0], selectedCards[1]);
        else
            score++;
        // If they are the same, do nothing
        // Reset counters
        selectedCards = [];
        cardsSelected = 1;
    }
    
    // Change card styling when selected
    card.classList.remove("card-front");
    card.classList.add("card-selected");

    // Flip the card and add its id to an array 
    flipCard(card);
    selectedCards.push(card.getAttribute("cardID"));
    
}

// Function to add the album art to a selected card so that it appears to be flipped over - use the album id as its index position in the array
function flipCard(card) {
    card.style.backgroundImage = "url(./images/" + imageList[card.getAttribute("cardsAlbumID")] + ".png)";
    card.style.backgroundSize = "cover";
}

// Function to flip back over the cards
// Once two cards are selected and they are not the same, return them to a blank state
function resetFlipped(index1, index2) {
    // Take away the album cover background image
    cardList[index1].style.backgroundImage = "none";
    // Remove styling for when a card is selected
    cardList[index1].classList.remove("card-selected");
    // Add styling for a blank card
    cardList[index1].classList.add("card-front");
    // Repeat for the other card
    cardList[index2].style.backgroundImage = "none";
    cardList[index2].classList.remove("card-selected");
    cardList[index2].classList.add("card-front");
}

// Function to add a new listener to each card
function addListener(card) {
    card.addEventListener("click", function() { selectCard(card); })
}

// Function to pick 10 albums at random from the images array
function pickAlbums() {
    // Create temp variable
    var rand = 0;
    // Generate 10 different numbers
    for (var i = 0; i < 10; i++) {
        // Generate a random number 0-9
        rand = Math.floor(Math.random() * (imageList.length - 1));

        // Make sure there are no duplicate numbers
        // Check the random number against each number in the array
        for (var j = 0; j < albumsToUse.length; j++) {
            // While they are the same, generate a new number
            while (rand == albumsToUse[j]) { 
                rand = Math.floor(Math.random() * (imageList.length - 1));
                // reset the counter to check the new number against every number in the array
                j = 0;
            }
        }
        
        // add the random number to the array
        albumsToUse.push(rand);
    }

    // duplicate the numbers to have one album for 2 cards
    albumsToUse = albumsToUse.concat(albumsToUse);
}

// Function to pick a random album from the array
function assignAlbum() {
    // Generate and return a random number
    return Math.floor(Math.random() * (albumsToUse.length));
}

// Function call to create the cards
SpawnCards();