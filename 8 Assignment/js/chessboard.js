// Function to create the chessboard
function createBoard(chessboard) {
    // 8 rows and 8 columns
    // Rows
    for (var i = 0; i < 8; i++) {
        // Columns
        for (var j = 0; j < 8; j++) {
            // Build squares
            // Create a new div
            var chessSqr = document.createElement("div");

            // Assign css class to each square
            chessSqr.className = "chessSqr";

            // Depending on the square, change the color
            // If it is even, change the color to a dark color
            if ((i + j) % 2 == 0) {
                chessSqr.style.backgroundColor = "rgb(35, 0, 0)";
            }

            // Add the square to the board
            chessboard.appendChild(chessSqr);
        }
    }
}