document.addEventListener("DOMContentLoaded", () => {
    // Function to handle post deletion
    const deleteButtons = document.querySelectorAll('.delete-btn');


    deleteButtons.forEach(button => {

        button.addEventListener('click', function() {
            // Get the post ID from the dataset of the clicked button
            const postId = this.dataset.postId;
            
            // Display confirmation dialog before deletion
            if (!confirm("Are you sure you want to delete this post?")) return;

            // Send a DELETE request to the server to delete the post
            fetch(`/api/posts/${postId}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' 
            })
            .then(response => {
                // Check if response is successful
                if (!response.ok) {
                    return response.json().then(data => {
                        // Throw error with detailed server message if available, else generic message
                        throw new Error(data.message || "Failed to delete the post");
                    }).catch(() => {
                        throw new Error("Failed to delete the post with no detailed server message");
                    });
                }
                // Parse JSON response
                return response.json(); 
            })
            .then(data => {
                // Display success message and remove post from the DOM
                alert(data.message); 
                document.querySelector(`.post[data-post-id="${postId}"]`).remove(); 
            })
            .catch(error => {
                // Handle errors during deletion process
                console.error('Error deleting post:', error);
                alert('Error occurred while trying to delete the post: ' + error.message);
            });
        });
    });
});
