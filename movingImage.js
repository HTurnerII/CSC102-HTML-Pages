// This variable will hold the ID of the interval timer for moving the meme image.
// It is initialized to null to indicate that the movement has not started yet.
let intervalId = null;

// Function to move the meme image randomly around the page
function moveMeme() {
    // Get the image element with the ID 'movingMeme' and assign it to the 'meme' constant.
    const meme = document.getElementById('movingMeme');

    // Get the maximum width and height to calculate random positions
    const maxWidth = window.innerWidth - meme.width;
    const maxHeight = window.innerHeight - meme.height;

    // Generate random top and left positions
    const randomLeft = Math.floor(Math.random() * maxWidth);
    const randomTop = Math.floor(Math.random() * maxHeight);

    // Move the meme image to the new position
    meme.style.left = randomLeft + 'px';
    meme.style.top = randomTop + 'px';
}

// Function to start moving the meme image randomly
function startMoving() {
    if (intervalId === null) { // Prevent multiple intervals from being set
        intervalId = setInterval(moveMeme, 1000); // Move every second
    }
}

// Function to stop moving the meme image
function stopMoving() {
    clearInterval(intervalId); // Stop the interval
    intervalId = null; // Reset the interval ID
}

// Attach functions to buttons
document.getElementById('startButton').addEventListener('click', startMoving);
document.getElementById('stopButton').addEventListener('click', stopMoving);