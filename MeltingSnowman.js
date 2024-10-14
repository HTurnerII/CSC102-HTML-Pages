// Define the list of words to choose from
const words = [
    'JAVASCRIPT', 'HTML', 'CSS', 'NODE', 'REACT', 'ANGULAR', 'JQUERY', 'VUE'
];

// Define the maximum number of incorrect guesses allowed
const maxWrongGuesses = 6;

let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let guessedLettersSet = new Set(); // Track already guessed letters

// Select random word from the list
function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Initialize the game
function initializeGame() {
    wordToGuess = selectRandomWord();
    guessedLetters = Array(wordToGuess.length).fill('_');
    wrongGuesses = 0;
    guessedLettersSet.clear(); // Reset guessed letters set

    // Update the word display
    updateWordDisplay();
    updateMeltingSnowmanGraphic();

    // Remove any previously generated buttons
    const lettersContainer = document.querySelector('.letters');
    while (lettersContainer.firstChild) {
        lettersContainer.removeChild(lettersContainer.firstChild);
    }

    // Generate the letter buttons
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i);
        const button = document.createElement('button');
        button.innerText = letter;
        button.addEventListener('click', function () {
            handleGuess(letter);
        });
        // Ensure buttons are enabled when game resets
        button.disabled = false;
        lettersContainer.appendChild(button);
    }

    // Clear any previous win/lose message
    const messageContainer = document.querySelector('.message');
    messageContainer.innerText = '';
}

// Update the word display
function updateWordDisplay() {
    const wordContainer = document.querySelector('.word');
    wordContainer.innerText = guessedLetters.join(' ');
}

// Function to check if a letter has already been guessed
function hasLetterBeenGuessed(letter) {
    return guessedLettersSet.has(letter);
}

// Function to add a guessed letter to the set
function addGuessedLetter(letter) {
    guessedLettersSet.add(letter);
}

// Function to clear the guessed letters (for resetting the game)
function clearGuessedLetters() {
    guessedLettersSet.clear();
}

function handleGuess(letter) {
    // If the game is over, do nothing
    if (guessedLetters.join('') === wordToGuess || wrongGuesses >= maxWrongGuesses) {
        return;
    }

    // If the letter has already been guessed, do nothing
    if (hasLetterBeenGuessed(letter)) {
        return;
    }

    // Add the letter to the set of guessed letters
    addGuessedLetter(letter);
    let correctGuess = false;

    // Check if the letter is in the word
    wordToGuess.split('').forEach((char, index) => {
        if (char === letter) {
            guessedLetters[index] = letter;
            correctGuess = true;
        }
    });

    // If not a correct guess, increase wrong guesses and update snowman
    if (!correctGuess) {
        wrongGuesses++;
    }

    // Update Melting Snowman Graphic
    updateMeltingSnowmanGraphic();

    // Update the word display
    updateWordDisplay();

    // Update check Win Or Lose
    checkWinOrLose();
}

// Update the Melting Snowman graphic
function updateMeltingSnowmanGraphic() {
    const meltingSnowmanContainer = document.querySelector('.meltingSnowman');
    
    // Ensure wrongGuesses doesn't exceed the maxWrongGuesses limit
    if (meltingSnowmanContainer) {
        if (wrongGuesses === 0) {
            // Display the placeholder image before any guesses are made
            meltingSnowmanContainer.innerHTML = '<img src="./snowman_placeholder.png" alt="snowman placeholder">';
        } else if (wrongGuesses <= maxWrongGuesses) {
            meltingSnowmanContainer.innerHTML = `<img src="./snowman${wrongGuesses}.png" alt="snowman ${wrongGuesses}">`;
        }
    }
}

// Check if the game has been won or lost
function checkWinOrLose() {
    const messageContainer = document.querySelector('.message');
    const letterButtons = document.querySelectorAll('.letters button');

    if (guessedLetters.join('') === wordToGuess) {
        messageContainer.innerText = 'You win!';
        letterButtons.forEach(button => {
            button.disabled = true;
        });
    } else if (wrongGuesses >= maxWrongGuesses) {
        messageContainer.innerText = `You lose! The word was "${wordToGuess}".`;
        letterButtons.forEach(button => {
            button.disabled = true;
        });
    }
}

// Add event listener for the info button
document.addEventListener('DOMContentLoaded', function () {
    const infoButton = document.getElementById('info-button');
    const rulesModal = document.getElementById('rules-modal');
    const closeButton = document.querySelector('.close');

    // Show the rules when the info button is clicked
    infoButton.addEventListener('click', function () {
        rulesModal.style.display = 'block';
    });

    // Hide the rules when the close button is clicked
    closeButton.addEventListener('click', function () {
        rulesModal.style.display = 'none';
    });

    // Hide the rules when clicking outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === rulesModal) {
            rulesModal.style.display = 'none';
        }
    });
});

// Initialize the game when the page loads
window.addEventListener('load', initializeGame);