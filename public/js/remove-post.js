console.log("post.js connected");

// Function to handle post deletion
const deletePost = async (postId, postElement) => {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE", // Ensure that the request method is set to DELETE
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            postElement.remove(); // Remove the post element from the DOM
        } else {
            console.error("Failed to delete post");
        }
    } catch (error) {
        console.error("Error deleting post:", error.message);
    }
};

// Get all post elements
const postElements = document.querySelectorAll(".post");

postElements.forEach(postElement => {
    postElement.addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const postId = event.target.dataset.postId; 
            deletePost(postId, postElement);
        }
    });
});
