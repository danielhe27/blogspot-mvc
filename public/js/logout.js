document.addEventListener('DOMContentLoaded', () => {
    // Find the logout button element by its ID
    const logoutButton = document.getElementById('logout-button');

    // Check if the logout button exists
    if (logoutButton) {
        // Add a click event listener to the logout button
        logoutButton.addEventListener('click', (event) => {
            // Prevent the default behavior of the button
            event.preventDefault();

            // Send a POST request to the server to log out the user
            fetch('/api/users/logout', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {

                if (response.ok) {

                    window.location.href = '/'; 
                } else {
                    alert('Failed to log out.');
                }
            })
            .catch(error => console.error('Error logging out:', error));
        });
    } else {
        // If the logout button is not found, log an error message
        console.error('Logout button not found');  
    }
});
