import { APP_KC_SECRETKEY } from "setup/application.properties";

const key = require("crypto")
  .createHash("sha256")
  .update(String(APP_KC_SECRETKEY))
  .digest("base64")
  .substr(0, 32);
const ENCRYPTION_KEY = key;
const IV_LENGTH = 16;

function encrypt(text) {
  let iv = require("crypto").randomBytes(IV_LENGTH);
  let cipher = require("crypto").createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = require("crypto").createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

export { encrypt, decrypt };
