document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default behavior
    // Clear tokens or user data from storage if you're using JWT or session storage
    // Example: localStorage.removeItem('token');
    window.location.href = 'index.html'; // Redirect to index.html on logout
});

