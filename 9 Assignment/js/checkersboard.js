// Create an array to hold all the checkers
arrPieces = [];

// Create pointer to span
var posSpan = document.getElementById("selectedSqr");

// Function to create the checkersboard
function createBoard(checkersboard) {
    // 8 rows and 8 columns
    // Initialize the 8x8 matrix of checkers to null
    for (var i = 0; i < 8; i++) {
        // Columns
        arrPieces[i] = [];
        for (var j = 0; j < 8; j++) {
            arrPieces[i][j] = null;
        }
    }

    // Rows
    for (var i = 0; i < 8; i++) {
        // Columns
        for (var j = 0; j < 8; j++) {
            // for each space in the matrix, figure out when row it is on and add a white or black checker in the correct spot
            if ((i == 0 || i == 2) && (j % 2) == 0) 
                arrPieces[i][j] = 'w';
            if (i == 1 && (j % 2) == 1)
                arrPieces[i][j] = 'w';

            else if ((i == 5 || i == 7) && (j % 2) == 1)
                arrPieces[i][j] = 'b';
            if (i == 6 && (j % 2) == 0)
                arrPieces[i][j] = 'b';

            // Build squares
            // Create a new div
            var checkersSqr = document.createElement("div");

            // Assign css class to each square and add an id based on the location in the matrix
            checkersSqr.className = "checkersSqr";
            checkersSqr.setAttribute("id", "div" + i + j);

            // Add a listener to check for clicks
            checkersSqr.addEventListener("click", movePiece);

            // Depending on the square, change the color
            // If it is even, change the color to a dark color
            if ((i + j) % 2 == 1) {
                checkersSqr.style.backgroundColor = "rgb(35, 0, 0)";
            }

            // Add the square to the board
            checkersboard.appendChild(checkersSqr);

            // If it is a space that should have a checker(not null), create a new checker
            if (arrPieces[i][j]) {
                createChecker("checker" + i + j, "checker-" + arrPieces[i][j], checkersSqr);
            }
        }
    }
}

// Function to create the checkers pieces
function createChecker(id, pieceColor, boardPos) {
    // Create a new div
    var newPiece = document.createElement("div");
    // Set the id and add css classes
    newPiece.setAttribute("id", id);
    newPiece.classList.add("checker");
    newPiece.classList.add(pieceColor); // Depends on which color it should be

    // Add a listener so the pieces can move
    newPiece.addEventListener("click", savePieceID);
    // Add the piece to the board
    boardPos.appendChild(newPiece);
}

// Function to move the piece
function movePiece(event) {
    // Find which square is clicked
    var newSqrID = event.target.id;

    // Get rid of extra text in the id
    newSqrID = newSqrID.replace("checker", "").replace("div", "");
    
    // Get the id from the saved id from the span
    var oldSqrID = posSpan.textContent;

    // Check if they are different squares so if they are:
    if (newSqrID != oldSqrID) {
        console.log("new: " + newSqrID + " old: " + oldSqrID);
        // Check to see if the player skipped the opposition's checker
        skipChecker(oldSqrID, newSqrID);

        // Create pointer to the old square
        var oldSquare = document.getElementById("div" + oldSqrID);
        var oldChecker = document.getElementById("checker" + oldSqrID);

        // Get the color that it was
        var oldPieceColorClass = oldChecker.classList[1];

        // Remove the old checker that is to be moved
        oldSquare.removeChild(oldChecker);

        // Create a new piece
        var newSqr = document.getElementById("div" + newSqrID);
        createChecker("checker" + newSqrID, oldPieceColorClass, newSqr);

        // Clear the span
        posSpan.textContent = "";
    }
}

// Function to save piece id
function savePieceID(event) {
    // Save the selected checker's ID
    var selectedCheckerID = event.target.id;

    // Remove extra text from the id
    selectedCheckerID = selectedCheckerID.replace("checker", "");

    // Store the checker id
    posSpan.textContent = selectedCheckerID;
}


// Function to check if there was a check that was passed over
function skipChecker(oldPos, newPos) {
    // If the old position, plus or minus 9 or 11 is equal to the new destination, a checker skipped. 
    // If the difference between the new spot and the original is either 18 or 22, plus or minus, remove the checker in the coresponding ID, plus or minus 9 or 11 of the new spot
    
    // var to hold the difference between the 2 positions
    var difference = newPos - oldPos;
    // Create var to hold skipped checker's square id
    var skippedID = 0;

    // If the difference between the two positions is either the absolute value of 18 or 22 then a checker is moved 2 spaces diagonally
    if (Math.abs(difference) == 18 || Math.abs(difference) == 22) {
        // Depending on the difference and if it is positive or negative determines the direction the checker is moved
        // Based on this, calculate the ID of the checker that is skipped over
        if (difference == 18) {
            skippedID = parseInt(newPos) - 9;
        }
        else if (difference == -18) {
            skippedID = parseInt(newPos) + 9;
        }
        else if (difference == 22) {
            skippedID = parseInt(newPos) - 11;
        }
        else if (difference == -22) {
            skippedID = parseInt(newPos) + 11;
        }
    }

    // Get references to the skipped checker and its square
    var skippedSquare = document.getElementById("div" + skippedID);
    var skippedChecker = document.getElementById("checker" + skippedID);

    // If a checker is found and needs to be skipped, remove it from the board
    if (skippedID != 0) {
        skippedSquare.removeChild(skippedChecker);
    }
}