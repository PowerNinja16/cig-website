import fs from "fs";
import crypto from "crypto";

const password = "*****"; // ARG password
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

const key = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");

const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

const plaintext = fs.readFileSync("FILE_TO_ENCRYPT.txt");
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const tag = cipher.getAuthTag();

const output = {
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  tag: tag.toString("base64"),
  data: encrypted.toString("base64")
};

fs.writeFileSync("secret.enc.json", JSON.stringify(output, null, 2));