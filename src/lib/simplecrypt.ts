export class Simplecrypt {
  private key: string;

  constructor(key: string) {
    if (!key) throw new Error("Encryption key is required.");
    this.key = key;
  }

  // Helper function to convert string to Uint8Array
  private stringToUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str);
  }

  // Helper function to convert Uint8Array to string
  private uint8ArrayToString(uintArray: Uint8Array): string {
    return new TextDecoder().decode(uintArray);
  }

  // Helper function to convert Uint8Array to Base64
  private uint8ArrayToBase64(uintArray: Uint8Array): string {
    let binary = "";
    uintArray.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

  // Helper function to convert Base64 to Uint8Array
  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const uintArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uintArray[i] = binaryString.charCodeAt(i);
    }
    return uintArray;
  }

  // Simple substitution cipher to add complexity
  private substitute(
    data: Uint8Array,
    direction: "encrypt" | "decrypt",
  ): Uint8Array {
    const substitutionTable = this.createSubstitutionTable();
    const substitutedData = new Uint8Array(data.length);

    for (let i = 0; i < data.length; i++) {
      const byte = data[i];
      if (direction === "encrypt") {
        substitutedData[i] = substitutionTable[byte] || byte; // Substitute if mapping exists
      } else {
        substitutedData[i] =
          substitutionTable.indexOf(byte) !== -1
            ? substitutionTable.indexOf(byte)
            : byte; // Reverse substitution
      }
    }

    return substitutedData;
  }

  // Create a substitution table for additional complexity
  private createSubstitutionTable(): Uint8Array {
    const table = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      table[i] = (i + 128) % 256; // Simple substitution logic
    }
    return table;
  }

  // XOR-based encryption with substitution
  encrypt(plaintext: string): string {
    if (!plaintext) throw new Error("Plaintext cannot be empty.");

    const plaintextBytes = this.stringToUint8Array(plaintext);
    const keyBytes = this.stringToUint8Array(this.key);

    // Apply substitution before XOR
    const substitutedBytes = this.substitute(plaintextBytes, "encrypt");

    const encryptedBytes = new Uint8Array(substitutedBytes.length);

    for (let i = 0; i < substitutedBytes.length; i++) {
      const keyByte = keyBytes[i % keyBytes.length];
      encryptedBytes[i] = substitutedBytes[i] ^ keyByte; // XOR operation
    }

    return this.uint8ArrayToBase64(encryptedBytes);
  }

  // XOR-based decryption with substitution
  decrypt(ciphertext: string): string {
    if (!ciphertext) throw new Error("Ciphertext cannot be empty.");

    const encryptedBytes = this.base64ToUint8Array(ciphertext);
    const keyBytes = this.stringToUint8Array(this.key);

    const decryptedBytes = new Uint8Array(encryptedBytes.length);

    for (let i = 0; i < encryptedBytes.length; i++) {
      const keyByte = keyBytes[i % keyBytes.length];
      decryptedBytes[i] = encryptedBytes[i] ^ keyByte; // XOR operation
    }

    // Reverse substitution after XOR
    const originalBytes = this.substitute(decryptedBytes, "decrypt");

    return this.uint8ArrayToString(originalBytes);
  }
}
