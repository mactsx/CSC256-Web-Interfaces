// Add event listener that runs after DOM
document.addEventListener('DOMContentLoaded', initLinks);

// Create array to hold all of the pictures
var picArray = ["./Images/geisha.png", "./Images/crow.jpg", "./Images/watcher.jpg", "./Images/soulOfCinder.jpg"];

// Keep track of current image
var currPic = 0;

// Add listeneres to the links to call function when clicked - this will change the picture in the slideshow
function initLinks() {
    document.getElementById("anchorPrevLink").addEventListener("click", processPrevious);
    document.getElementById("anchorNextLink").addEventListener("click", processNext);
}

// Function to change the image when the previous button is pressed
function processPrevious() {
    // Prevent default action of link(navigation to #)
    event.preventDefault();

    // Check for array index bounds - decrement the current picture only if the current picture is not already 0
    if (currPic != 0)
        currPic -= 1;

    // Update the image
    document.getElementById("imgPicture").src = picArray[currPic];

}

// Function to change the image when the next button is pressed
function processNext() {
    // prevent default action of link(navigation to #)
    event.preventDefault();

    // Check for array index bounds - increment the current picture only if the current picture is not already at the end of the array
    if (currPic != picArray.length - 1)
        currPic += 1;

    // Update the image
    document.getElementById("imgPicture").src = picArray[currPic];
}