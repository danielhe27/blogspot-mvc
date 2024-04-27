// Event listener for when the DOM content has loaded
document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class 'add-comment-btn' and assign them to the 'addCommentButtons' variable
  const addCommentButtons = document.querySelectorAll('.add-comment-btn');

  // Iterate over each 'addCommentButton' element
  addCommentButtons.forEach(button => {
    // Add a click event listener to each 'addCommentButton'
    button.addEventListener('click', async function(event) {
      // Get the postId from the parent element's dataset
      const postId = button.parentElement.dataset.postId;

      // Find the comment form associated with the button
      const commentForm = button.parentElement.querySelector('.comment-form');
      

      commentForm.style.display = 'block';

      // Get the text content of the textarea within the comment form and trim any leading/trailing whitespace
      const commentText = commentForm.querySelector('textarea').value.trim();

      try {
        // Send a POST request to the server to add a new comment
        const response = await fetch(`/api/comment/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // Send the comment data as JSON in the request body
          body: JSON.stringify({ comment_text: commentText, post_id: postId }) 
        });

        // Check if the response is successful
        if (!response.ok) {
          // If not successful, throw an error
          throw new Error('Failed to add comment');
        }


        const data = await response.json();
        // Log the newly added comment data to the console
        console.log('New comment added:', data);
        // Reload the page to reflect the newly added comment
        window.location.reload();
      } catch (error) {
        // If an error occurs during the process, log the error to the console
        console.error('Error adding comment:', error);
      }
    });
  });
});
