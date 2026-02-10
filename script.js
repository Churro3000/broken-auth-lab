// Hard-coded users — VERY INSECURE (visible to everyone!)
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password' },
    { username: 'viewy', password: 'letmein' }
];

// Handle form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Insecure: plaintext comparison, no hashing
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // "Login" success — using localStorage (also insecure)
        localStorage.setItem('loggedIn', 'true');
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        // Username enumeration vulnerability
        const existingUser = users.some(u => u.username === username);
        if (existingUser) {
            errorMessage.textContent = 'Invalid password!';
        } else {
            errorMessage.textContent = 'User not found!';
        }
    }
});

// Logout
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('loggedIn');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('error-message').textContent = '';
});

// Auto-login if already "logged in" (persistent — bad!)
if (localStorage.getItem('loggedIn') === 'true') {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}
