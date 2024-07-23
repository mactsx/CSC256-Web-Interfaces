arrPieces = [];

// Create pointer to span
var posSpan = document.getElementById("selectedSqr");

// Function to create the checkersboard
function createBoard(checkersboard) {
    // 8 rows and 8 columns
    // Initialize the matrix of pieces
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

            // Assign css class to each square
            checkersSqr.className = "checkersSqr";
            checkersSqr.setAttribute("id", "div" + i + j);

            checkersSqr.addEventListener("click", movePiece);

            // Depending on the square, change the color
            // If it is even, change the color to a dark color
            if ((i + j) % 2 == 1) {
                checkersSqr.style.backgroundColor = "rgb(35, 0, 0)";
                
            }

            // Add the square to the board
            checkersboard.appendChild(checkersSqr);

            if (arrPieces[i][j]) {
                createChecker("checker" + i + j, "checker-" + arrPieces[i][j], checkersSqr);
            }


        }
    }
}

// Function to create the checkers pieces
function createChecker(id, pieceColor, boardPos) {
    var newPiece = document.createElement("div");
    newPiece.setAttribute("id", id);
    newPiece.classList.add("checker");
    newPiece.classList.add(pieceColor);

    newPiece.addEventListener("click", savePieceID);
    boardPos.appendChild(newPiece);
}

// Function to move the piece
function movePiece(event) {
    // Find which square is clicked
    var newSqrID = event.target.id;

    newSqrID = newSqrID.replace("checker", "").replace("div", "");
    
    // Get the id from the saved id from the span
    var oldSqrID = posSpan.textContent;

    // Check if they are different squares
    if (newSqrID != oldSqrID) {
        console.log("new: " + newSqrID + " old: " + oldSqrID);
        skipChecker(oldSqrID, newSqrID);

        // Create pointer to the old square
        var oldSquare = document.getElementById("div" + oldSqrID);
        var oldChecker = document.getElementById("checker" + oldSqrID);

        var oldPieceColorClass = oldChecker.classList[1];

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
    var selectedCheckerID = event.target.id;

    // Remove extra text from the id
    selectedCheckerID = selectedCheckerID.replace("checker", "");

    // Store the checker id
    posSpan.textContent = selectedCheckerID;

    console.log(selectedCheckerID);
}


// Function to check if there was a check that was passed over
function skipChecker(oldPos, newPos) {
    // if the old position, plus or minus 9 or 11 is equal to the new destination, a checker skipped. 
    // if the difference between the new spot and the original is either 18 or 22, plus or minus, remove the checker in the coresponding id as plus or minus 9 or 11
    
    // var to hold the difference between the 2 positions
    var difference = newPos - oldPos;
    // Create pointer to skipped checker square id
    var skippedID = 0;

    if (Math.abs(difference) == 18 || Math.abs(difference) == 22) {
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

    console.log(skippedID);

    var skippedSquare = document.getElementById("div" + skippedID);
    var skippedChecker = document.getElementById("checker" + skippedID);


    if (skippedID != 0) {
        skippedSquare.removeChild(skippedChecker);
    }

    skippedID = 0;
}