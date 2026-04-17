// crypto.js

async function deriveKey(password, salt) {
  const enc = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

export async function decryptFile(encJson, password) {
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

  const salt = b64(encJson.salt);
  const iv   = b64(encJson.iv);
  const tag  = b64(encJson.tag);
  const data = b64(encJson.data);

  const encrypted = new Uint8Array([...data, ...tag]);
  const key = await deriveKey(password, salt);

  return crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );
}