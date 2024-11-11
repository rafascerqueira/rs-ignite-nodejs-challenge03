import crypto from "node:crypto";


export function passwordHash(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 32, "sha512")
    .toString("hex");

  return { salt, hash };
}

export function verifyPassword(password: string, salt: string, hash: string) {

  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 32, "sha512")
    .toString("hex");

  return hash === hashVerify;
}