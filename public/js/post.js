document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission for creating a new post
    async function newFormHandler(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the title and content values from the form inputs
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value.trim();

        // Send a POST request to the server with the new post data
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

    // Add an event listener to the new post form for form submission
    document.getElementById('new-post-form').addEventListener('submit', newFormHandler);
});
