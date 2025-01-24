"use client";
import { Simplecrypt } from "@/lib/simplecrypt";

const NEXT_PUBLIC_ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY ||
  "process.env.NEXT_PUBLIC_ENCRYPTION_KEY"; // Must be kept secret
console.log({ NEXT_PUBLIC_ENCRYPTION_KEY });
const S = new Simplecrypt(NEXT_PUBLIC_ENCRYPTION_KEY!);

// Store encrypted data in localStorage
export const setEncryptedLocalStorage = (key: string, value: string): void => {
  try {
    const encryptedKey = S.encrypt(key); // Encrypt the key
    const encryptedValue = S.encrypt(value); // Encrypt the value
    localStorage.setItem(encryptedKey, encryptedValue);
  } catch (error) {
    console.error("Error storing encrypted data:", error);
    throw error;
  }
};

// Retrieve and decrypt data from localStorage
export const getDecryptedLocalStorage = (key: string): string | null => {
  try {
    const encryptedKey = S.encrypt(key);
    const encryptedValue = localStorage.getItem(encryptedKey);
    if (encryptedValue) {
      const decryptedValue = S.decrypt(encryptedValue); // Decrypt the value
      return decryptedValue;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving or decrypting data:", error);
    return null;
  }
};
