document.addEventListener('DOMContentLoaded', function() {

    // Function to toggle update form visibility
    function toggleUpdateForm(postId) {
        const updateForm = document.querySelector(`#update-post-form-${postId}`);
        if (updateForm.style.display === 'block' || updateForm.style.display === '') {
            updateForm.style.display = 'none';
        } else {
            updateForm.style.display = 'block';
        }
    }

    // Add event listener to handle update button click
    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            const postId = this.getAttribute('data-post-id');
            toggleUpdateForm(postId);
        });
    });

    // Function to handle form submission for updating posts
    async function updateFormHandler(event) {
        event.preventDefault();

        // Extract post ID from the form's ID attribute
        const postId = event.target.getAttribute('id').split('-').pop();
        // Get updated title and content from form inputs
        const title = document.getElementById(`updatePostTitle-${postId}`).value.trim();
        const content = document.getElementById(`updatePostContent-${postId}`).value.trim();

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if the update was successful
            if (response.ok) {
                // Reload the page
                window.location.reload();
            } else {
                // Display an error
                throw new Error('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert(error.message);
        }
    }

    // Add event listeners to all update forms
    document.querySelectorAll('.update-form').forEach(form => {
        form.addEventListener('submit', updateFormHandler);
    });
});
