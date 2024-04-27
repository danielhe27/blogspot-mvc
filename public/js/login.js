// Function to handle the login form submission
async function loginFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of the username and password input fields and trim any leading/trailing whitespace
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        // Send a POST request to the server to authenticate the user
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (response.ok) {
            // If successful, redirect the user to the homepage
            document.location.replace('/');
        } else {
            // If unsuccessful, display an alert with the error message returned from the server
            response.json().then(data => {
                console.error('Login failed:', data.message);
                alert(data.message); 
            });
        }
    } 
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form[action="/login"]').addEventListener('submit', loginFormHandler);
});
