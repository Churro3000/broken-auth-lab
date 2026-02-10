// Hard-coded users — VERY INSECURE (visible to everyone!)
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password' },
    { username: 'viewy', password: 'letmein' }
];

// ────────────────────────────────────────────────
// Login logic
// ────────────────────────────────────────────────
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // NEW: Prevent empty submission and show custom message
    if (!username.trim() || !password.trim()) {
        errorMessage.textContent = 'Please enter both username and password.';
        return;
    }

    // Insecure: plaintext comparison, no hashing
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // "Login" success — using localStorage (also insecure)
        localStorage.setItem('loggedIn', 'true');
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('error-message').textContent = '';
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

// ────────────────────────────────────────────────
// Password Reset logic (NEW - intentionally broken)
// ────────────────────────────────────────────────
function showReset() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('reset-container').style.display = 'block';
    document.getElementById('reset-result').textContent = '';
}

function showLogin() {
    document.getElementById('reset-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

document.getElementById('reset-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('reset-username').value.trim();
    const result = document.getElementById('reset-result');

    if (!username) {
        result.textContent = 'Please enter a username.';
        result.style.color = 'red';
        return;
    }

    // Check if user exists (still leaks valid usernames)
    const userExists = users.some(u => u.username === username);

    if (!userExists) {
        result.textContent = 'No account found with that username.';
        result.style.color = 'red';
        return;
    }

    // Very broken: predictable token (base64 of username + static string)
    const fakeToken = btoa(username + '-reset-2025');

    // Simulate "email sent" with dangerous link
    result.innerHTML = `
        A password reset link has been sent to your email.<br><br>
        <strong>Reset link (for demo purposes):</strong><br>
        https://example.com/reset?user=${encodeURIComponent(username)}&token=${fakeToken}<br><br>
        <span style="color: #d32f2f; font-weight: bold;">
            WARNING: This token is predictable and contains the username!
        </span>
    `;
    result.style.color = '#333';
});
