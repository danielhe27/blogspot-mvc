async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            response.json().then(data => {
                console.error('Login failed:', data.message);
                alert(data.message); 
            });
        }
    } 
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form[action="/login"]').addEventListener('submit', loginFormHandler);
});
