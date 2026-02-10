# Broken Authentication Lab

**⚠️ WARNING: This is an intentionally vulnerable demo project for educational purposes only.  
Do NOT use real credentials, sensitive data, or deploy this in any production environment.**

A static single-page application built with **HTML, CSS, and JavaScript** that demonstrates several common **broken authentication** vulnerabilities — all client-side for easy demonstration.

Live demo: https://YOUR-USERNAME.github.io/broken-auth-lab/  
(Replace YOUR-USERNAME with your actual GitHub username)

## Project Goals

- Show why **client-side authentication is fundamentally insecure**
- Demonstrate real-world broken authentication patterns (OWASP A07:2021 – Identification and Authentication Failures)
- Help learners and pentesters understand how attackers exploit weak auth mechanisms
- Serve as a clean, documented portfolio piece for web security / pentesting roles

## Vulnerabilities Implemented

| # | Vulnerability                          | Description                                                                 | Impact / Why it's bad                                      | CWE / OWASP Reference                     |
|---|----------------------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------|-------------------------------------------|
| 1 | Hard-coded credentials                 | Usernames & passwords stored directly in JavaScript (visible in source)    | Anyone can view source → instant credential theft          | CWE-798: Use of Hard-coded Credentials    |
| 2 | Plaintext password comparison          | Passwords checked with `===` — no hashing, no salting                      | Easy to extract & reuse passwords                          | CWE-256: Plaintext Storage of Credentials |
| 3 | Username enumeration                   | Different error messages: "User not found" vs "Invalid password"           | Attacker can discover valid usernames                      | CWE-203: Observable Response Discrepancy  |
| 4 | Insecure session management            | "Logged in" state stored in `localStorage` (persistent, readable)          | Session survives browser restart, easy to tamper/read      | CWE-922: Insecure Storage of Sensitive Information |
| 5 | Predictable password reset token       | Reset token = base64(username + static string), includes username in URL   | Attacker can forge reset links for any user                | CWE-345, CWE-640, OWASP A07               |
| 6 | No rate limiting / brute-force protection | Unlimited login & reset attempts allowed                                   | Easy credential stuffing / enumeration attacks             | OWASP A07                                 |
| 7 | Information disclosure in reset flow   | Tells attacker whether username exists during reset                        | Amplifies username enumeration                             | CWE-200                                   |

## How to Use / Test the Lab

1. Visit the live site: https://YOUR-USERNAME.github.io/broken-auth-lab/
2. Try logging in with these credentials:
   - `admin` / `admin123`
   - `user1` / `password`
   - `viewy` / `letmein`
3. Test broken behaviors:
   - View page source (Ctrl+U) → search for `admin123`
   - Try wrong password for existing user → see "Invalid password!"
   - Try fake username → see "User not found!"
   - Close & reopen browser → still logged in (localStorage)
   - Click "Forgot password?" → enter `admin` → observe the predictable reset link
4. **Exploit demo (password reset attack)**:
   - Go to reset page
   - Enter `admin`
   - Copy the shown reset link
   - Change `user=admin` to `user=user1` or any other known username
   - The token stays valid → simulates account takeover

## Screenshots (add these yourself)

You can take screenshots and upload them to the repo (e.g. in an `images/` folder), then link them like this:

- Hard-coded credentials visible in source  
  ![Hard-coded creds](images/hardcoded-creds.png)
- Username enumeration error messages  
  ![Enumeration](images/enumeration.png)
- Predictable reset token  
  ![Reset token](images/reset-token.png)

## How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR-USERNAME/broken-auth-lab.git
