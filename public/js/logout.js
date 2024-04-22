document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
          event.preventDefault();  
          fetch('/api/users/logout', {  
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(response => {
              if (response.ok) {
                  window.location.href = '/'; 
              } else {
                  alert('Failed to log out.');
              }
          })
          .catch(error => console.error('Error logging out:', error));
      });
  } else {
      console.error('Logout button not found');  
  }
});
