document.addEventListener('DOMContentLoaded', function() {
  // Function to handle form submission for updating posts
  async function updateFormHandler(event) {
      event.preventDefault();

      // Extract post ID from the form's action attribute
      const postId = event.target.getAttribute('action').split('/').pop();
      // Get updated title and content from form inputs
      const title = document.getElementById(`updatePostTitle-${postId}`).value.trim();
      const content = document.getElementById(`updatePostContent-${postId}`).value.trim();

      try {
          // Send PUT request to update the post
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
              // Reload the page to reflect the changes
              window.location.reload();
          } else {
              // Display an error message if the update failed
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
