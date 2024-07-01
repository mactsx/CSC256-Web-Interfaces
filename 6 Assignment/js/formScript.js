// Function to add data entered into a formatted string
function submitForm() {
    event.preventDefault();

    // Get form inputs and assign to variables
    var userName = document.getElementById("txtCharName").value;
    var race = document.getElementById("txtRace").value;
    var charClass = document.getElementById("txtClass").value;
    var weapon = document.getElementById("txtWeapon").value;
    var alignment = document.getElementById("txtAlign").value;

    // Add all input values to a string
    var output = "User Name: " + userName + 
             "\n\nRace: " + race +
             "\n\nClass: " + charClass +
             "\n\nWeapon: " + weapon +
             "\n\nAlignment: " + alignment;

    // Add string to the textarea for display
    document.getElementById("txtAOutput").value = output;
}
