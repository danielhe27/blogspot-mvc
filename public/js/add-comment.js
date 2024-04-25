document.addEventListener('DOMContentLoaded', function() {
  const addCommentButtons = document.querySelectorAll('.add-comment-btn');

  addCommentButtons.forEach(button => {
    button.addEventListener('click', async function(event) {
      const postId = button.parentElement.dataset.postId; // Make sure the correct attribute is used here
      const commentForm = button.parentElement.querySelector('.comment-form');
      commentForm.style.display = 'block';

      const commentText = commentForm.querySelector('textarea').value.trim();

      try {
        const response = await fetch(`/api/comment/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ comment_text: commentText, post_id: postId }) 
        });

        if (!response.ok) {
          throw new Error('Failed to add comment');
        }

        const data = await response.json();
        console.log('New comment added:', data);
        window.location.reload();
comment
      } catch (error) {
        console.error('Error adding comment:', error);
       
      }
    });
  });
});
