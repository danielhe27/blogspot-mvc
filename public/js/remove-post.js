document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            if (!confirm("Are you sure you want to delete this post?")) return;

            fetch(`/api/posts/${postId}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' 
            })
            .then(response => {
                if (!response.ok) {
                    // Handle non-200 responses
                    return response.json().then(data => {

                        throw new Error(data.message || "Failed to delete the post");
                    }).catch(() => {

                        throw new Error("Failed to delete the post with no detailed server message");
                    });
                }
                return response.json(); 
            })
            .then(data => {
                alert(data.message); 
                document.querySelector(`.post[data-post-id="${postId}"]`).remove(); 
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                alert('Error occurred while trying to delete the post: ' + error.message);
            });
        });
    });
});
