// encode or decode text with a given key using bitwise or(XOR)
function xorShift(text: string, key: string) {
  return text
    .split('')
    .map((character, index) =>
      String.fromCharCode(
        character.charCodeAt(0) ^ key.charCodeAt(index % key.length)
      )
    )
    .join('');
}

/**
 * encrypts data by first reversing the text and then performing a XOR operation between a character in the text and the corresponding character in the key
 */
export function encrypt(text: string, key: string) {
  const reversedText = text.split('').reverse().join('');

  const encryptedText = xorShift(reversedText, key);

  // encode text to safely handle binary data
  return btoa(encryptedText);
}
// uses the reverse of the encryption method (same key)
export function decrypt(cipherText: string, key: string) {
  const decodedText = atob(cipherText); // decode data back to original form

  const decryptedText = xorShift(decodedText, key);

  const originalText = decryptedText.split('').reverse().join('');

  return originalText;
}
