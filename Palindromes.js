// Function to check if the user input is a palindrome
function checkPalindrome() {
    // Get the input value from the user
    let userInput = document.getElementById("userInput").value;
    
    // Remove spaces and convert input to lowercase for comparison
    let cleanedInput = userInput.replace(/\s+/g, '').toLowerCase();
    
    // Reverse the cleaned input
    let reversedInput = cleanedInput.split('').reverse().join('');
    
    // Find the message element in the HTML
    let messageElement = document.getElementById("resultMessage");
    
    // Check if the cleaned input matches the reversed input
    if (cleanedInput === reversedInput && cleanedInput.length > 0) {
      // If it's a palindrome, show positive feedback
      messageElement.textContent = `"${userInput}" is a palindrome!`;
      messageElement.className = "message palindrome";
    } else {
      // If it's not a palindrome, show negative feedback
      messageElement.textContent = `"${userInput}" is not a palindrome.`;
      messageElement.className = "message not-palindrome";
    }
}

  // Function to ask if the user wants to check another word
  function promptAnotherWord() {
    // Ask the user for confirmation
    let continueCheck = confirm("Do you want to check another word?");
    
    // If the user chooses to continue
    if (continueCheck) {
      // Clear the input field and result message
      document.getElementById("userInput").value = "";
      document.getElementById("resultMessage").textContent = "";
    } else {
      // If the user chooses to stop, exit by showing a goodbye message
      document.getElementById("resultMessage").textContent = "Goodbye!";
      document.getElementById("resultMessage").className = "message";
    }
}