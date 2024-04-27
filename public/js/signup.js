// Function to handle user signup form submission
async function signupFormHandler(event) {
    event.preventDefault();
  
    // Get form input values
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
  
    // Check if all required fields are filled
    if (username && password && email) {
        // Send a POST request to create a new user
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
                email  
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
        // Check if the response is successful
        if (response.ok) {
            // Redirect to the dashboard after successful signup
            document.location.replace('/dashboard');
        } else {
            // Alert user if there's an error during signup
            alert(response.statusText);
        }
    }
}

// Add event listener to the signup form submit event
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
