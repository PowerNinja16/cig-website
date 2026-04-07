CIG Secure Access Portal

A stylized, single‑page **secure login interface** built with HTML, CSS, and JavaScript.  
Designed as a **demo / narrative portal** inspired by internal corporate systems and sci‑fi aesthetics.

> ⚠️ This project is **not intended for real authentication or security‑critical use**.

✨ Features

*   Sleek cyber‑themed UI with scanline effect
*   Client‑side username + password validation
*   SHA‑256 password hashing using the **Web Crypto API**
*   Case‑ and whitespace‑tolerant username handling
*   Session‑based access flag (`sessionStorage`)
*   Redirect on successful authentication

🔐 How Authentication Works

Authentication is handled entirely **client‑side** for demonstration purposes.

Username

*   Converted to lowercase
*   Extra spaces collapsed
*   Compared against a single valid identity

Password

1.  Converted to uppercase
2.  Trimmed
3.  Hashed using **SHA‑256**
4.  Compared against a pre‑computed hash

```js
crypto.subtle.digest('SHA-256', data)
```

✅ Hash format: hexadecimal, lowercase  
❌ No salt, no server‑side validation

🚨 Security Disclaimer

This project uses **client‑side SHA‑256 hashing**, which is:

*   ✅ Cryptographically strong
*   ❌ Too fast for secure password storage
*   ❌ Visible to anyone viewing the source
*   ❌ Vulnerable to brute‑force and hash extraction

**Do NOT use this approach for real authentication systems.**

If you need real security:

*   Use server‑side authentication
*   Apply password hashing algorithms like **bcrypt**, **scrypt**, or **Argon2**
*   Add salting, rate limiting, and audit logging

🎯 Intended Use

*   UI/UX demonstrations
*   Fictional corporate portals
*   ARGs (Alternate Reality Games)
*   Educational examples
*   Portfolio projects

🛠️ Customization

To change the password:

1.  Decide on a new plaintext password (uppercase recommended)
2.  Generate its SHA‑256 hash
3.  Replace the value inside `VALID_HASHES` in `login.html`

📜 License

MIT License  
Feel free to use, modify, and adapt for non‑malicious purposes.

👤 Author

Created by **Collective Intelligence Group**  
Design & implementation for experimental / narrative use.

made with use of Copilot and Claude
