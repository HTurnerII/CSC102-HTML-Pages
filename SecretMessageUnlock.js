// Get the form element and error message div
const form = document.getElementById('userForm');
    const errorMessage = document.getElementById('errorMessage');
        const secretMessage = document.getElementById('secretMessage');
        
            // When the form is submitted, run this function
            form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            // Get values of the input fields
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const zipCode = document.getElementById('zipCode').value;
            
            // Combine first and last name
            const fullName = firstName + ' ' + lastName;
            
            // Reset error message
            errorMessage.textContent = '';
            
            // Check if the full name is greater than 20 characters
            if (fullName.length > 20) {
                errorMessage.textContent = 'Full name should not exceed 20 characters.';
                return; // Stop the process here if invalid
            }
            
            // Check if the zip code is exactly 5 digits
            if (!/^\d{5}$/.test(zipCode)) {
                errorMessage.textContent = 'Zip code must be exactly 5 digits.';
                return; // Stop the process here if invalid
            }
            
            // If validation passes, reveal the secret message
            secretMessage.classList.remove('hidden');
            errorMessage.textContent = ''; // Clear any previous error message
        });