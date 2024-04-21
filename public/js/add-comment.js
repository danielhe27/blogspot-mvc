document.querySelectorAll('.add-comment-btn').forEach(button => {
  button.addEventListener('click', () => {
      const commentForm = button.parentElement.querySelector('.comment-form');
      commentForm.style.display = 'block';
  });
});