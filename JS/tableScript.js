
var data = [
    ['UAT', 'Game Programming', 'jesbayer@uat.edu', 'April/May 2025']
];


// Function to create a table
function buildTable(tableData) {
    // link or pointer to the div in the html doc
    var tableContainer = document.getElementById("divTableContainer");
    
    // link or pointer to the table in the html doc
    var table = document.getElementById("tableData");

    // Create loop to populate the table
    for (var i = 0; i < tableData.length; i++) {
        var item = tableData[i];
        var row = document.createElement("tr");
        
        // Create nested loop to build data for current row
        for (j = 0; j < item.length; j++) {
            // Create column that will hold each piece of information
            var cell = document.createElement("td");

            // Check to see if the employee's favorite num is 16
            if (item[j] == 16) {
                cell.style.color = "red";
            }

            // Add data to the column
            cell.textContent = item[j];
            // Add column to the row
            row.appendChild(cell);
        }

        // Add the row to the table
        table.appendChild(row);
    }
}