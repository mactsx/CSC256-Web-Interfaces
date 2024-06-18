// Set empty array to hold strings
var arrQuotes = [];

// Function to add movie to array
function addQuote(event) {
    event.preventDefault();
    // Pointer variable to the text
    var txtQuoteInput = document.getElementById("txtQuote");
    // Variable to holds value
    var quote = txtQuoteInput.value.trim();

    // Check if there is actual text in the var
    if (quote) {
        // If there is
        // Add to array
        arrQuotes.push(quote);
        // Sort the array
        arrQuotes.sort();
        // Clear input textbox
        txtQuoteInput.value = "";
        // Update the list on the page
        updateQuoteList();
    }
}

// Function to update list of quotes on page
function updateQuoteList() {
    // Array to hold the formatted html list to display
    var arrQuotesFormatted = [];
    // Pointer to the quote list div
    var divQuotes = document.getElementById("divQuoteList");

    // Loop through array
    for (var i = 0; i < arrQuotes.length; i++) {
        // Format
        arrQuotesFormatted.push("<div class=\"array\">" + arrQuotes[i] + "</div>");
    }

    // Turn formatted list into string
    divQuotes.innerHTML = arrQuotesFormatted.join('');
}

// Function to clear the list of quotes
function clearList() {
    // Set the array to nothing
    arrQuotes = [];

    // Update the cleared list on the screen
    updateQuoteList();
}

