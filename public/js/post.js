document.addEventListener('DOMContentLoaded', function() {
    async function newFormHandler(event) {
        event.preventDefault();

        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value.trim();

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

    document.getElementById('new-post-form').addEventListener('submit', newFormHandler);

    });
