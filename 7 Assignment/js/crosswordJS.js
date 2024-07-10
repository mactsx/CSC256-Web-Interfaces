// Create an array of the crossword words
var arrWords = ["COUNTRY", "ELECTRONIC", "ALTERNATIVE", "METALCORE"]

// Create a table to hold all possible cells for the words
var table = document.getElementById("tblPuzzle");

// Function to build the table on the page
function buildTable(table) {
    // Build an 10 by 11 table
    // Create 10 rows
    for (var i = 0; i < 10; i++) {
        var row = document.createElement("tr");

        // Create 11 columns
        for (var j = 0; j < 11; j++) {
            var col = document.createElement("td");
            // Add the col to the row
            row.appendChild(col);
        }
        // Add the row to the table
        table.appendChild(row);
    }
}

// Function to put the crosswords on the page
function buildWords(wordIndex, direction, startingRow, startingCol, table, showAns) {
    // Loop through for as many letters the words have
    for (var i = 0; i < arrWords[wordIndex].length; i++) {
        var tr;
        var td;
        var rowIndex;
        var colIndex;

        // If the words goes across, increment the col each time in order to move across
        if (direction == "across") {
            rowIndex = startingRow;
            colIndex = startingCol + i;
        }
        // Otherwise if its down, increment the row each time to move down
        else if (direction == "down") {
            rowIndex = startingRow + i;
            colIndex = startingCol;
        } // Otherwise something else happened
        else
            console.log("something else");
        // Get the current row and cell
        tr = table.rows[rowIndex];
        td = tr.cells[colIndex];

        // Make sure there is only 1 input box per cell
        if (td.childElementCount == 0) {
            // Create an input box and set the max length to 1
            var input = document.createElement("input");
            input.setAttribute("maxLength", "1");

            // If the user wants to reveal the answers
            if (showAns) {
                // Add the letter to the textbox
                input.value = arrWords[wordIndex][i].toUpperCase();
            }
            // Add textbox to the table cell
            td.appendChild(input);
        } // If there is already an input box in the cell and the user wants to see the answers
        // Add the letter to the cell
        else if (showAns) {
            var existingInput = td.getElementsByTagName("input")[0];
            existingInput.value = arrWords[wordIndex][i].toUpperCase();
        }
    }
}

// Build the table and the text boxes for the crossword
buildTable(table);
buildWords(0, "down", 0, 2, table, false);
buildWords(1, "down", 0, 7, table, false);
buildWords(2, "across", 4, 0, table, false);
buildWords(3, "across", 9, 2, table, false);

// Function to add the letters to the table if the button to reveal the answers is pressed
function revealAns() {
    buildWords(0, "down", 0, 2, table, true);
    buildWords(1, "down", 0, 7, table, true);
    buildWords(2, "across", 4, 0, table, true);
    buildWords(3, "across", 9, 2, table, true);
}