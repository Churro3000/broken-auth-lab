# Broken Auth Lab

A simple static website demonstrating **broken authentication** vulnerabilities using only HTML, CSS, and JavaScript.

**Important:** This is intentionally insecure — do NOT use real credentials!

## Vulnerabilities shown
- Hard-coded credentials in JavaScript (visible in source code)
- Plaintext password comparison (no hashing)
- Username enumeration via different error messages
- Insecure "session" using localStorage
- No rate limiting / brute-force protection

## How to use
1. Go to https://YOUR-USERNAME.github.io/broken-auth-lab/
2. Try logging in with:
   - admin / admin123
   - user1 / password
   - viewy / letmein
3. Look at the page source (Ctrl+U) to see the passwords 

## Learning goals
Understand why client-side authentication is dangerous and should never be used for real applications.
