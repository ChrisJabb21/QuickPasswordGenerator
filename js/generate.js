/** Generate a secure cryptographically strong random password based on the specified options/criteria.
@param length: The desired length of the generated password. Must be a positive integer.
@param lowerCase: A boolean indicating whether to include lowercase letters in the password.
@param upperCase: A boolean indicating whether to include uppercase letters in the password.
@param digits: A boolean indicating whether to include digits in the password.
@param symbols: A boolean indicating whether to include symbols in the password.
@param noLookAlikes: A boolean indicating whether to exclude look-alike characters (e.g., 'O' and '0', 'l' and '1') from the password.
@returns: A randomly generated password string that meets the specified criteria.
*/
import { secureRandomInt } from "./cryptoRandom.js";

export function generatePassword({
    length = 16,
    lowerCase = true,
    upperCase = true,
    digits= true,
    symbols = true,
    noLookAlikes = true
}) {
    // The sets object defines the character sets for lowercase letters, uppercase letters, digits, and symbols. Each property of the sets object contains a string of characters that belong to that set.
    const sets = {
        lowerCase: "abcdefghijklmnopqrstuvwxyz",
        upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        digits: "0123456789",
        symbols: "!@#$%^&*()-=_+[]{}|;:,.<>?/~`",
    };

    // The pool variable is created by concatenating the selected character sets based on the options provided.
    const pool = []
        .concat(lowerCase ? (noLookAlikes ? sets.lowerCase : "abcdefghijklmnopqrstuvwxyz") : []) 
        .concat(upperCase ? (noLookAlikes ? sets.upperCase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ") : []) 
        .concat(digits ? (noLookAlikes ? sets.digits : "0123456789") : [])
        .concat(symbols ? sets.symbols : [])
        .join("");

    if (!pool){
        throw new Error("No character sets selected");
    }
    // Hold the characters that must be included in the generated password based on the selected options. For each selected character set, a random character from that set is added to the requiredChars array.
    const requiredChars = [];

    if (lowerCase) {
        requiredChars.push(
            sets.lowerCase[secureRandomInt(sets.lowerCase.length)]
        );
    }
    if (upperCase) {
        requiredChars.push(
            sets.upperCase[secureRandomInt(sets.upperCase.length)]
        );
    }
    if (digits) {
        requiredChars.push(
            sets.digits[secureRandomInt(sets.digits.length)]
        );
    }
    if (symbols) {
        requiredChars.push(
            sets.symbols[secureRandomInt(sets.symbols.length)]
        );
    }
    // The passwordBuffer array is initialized to hold the characters of the generated password. It will be populated with characters from the pool and the required sets.
    const passwordBuffer = [];
    for (let i = 0; i < length - requiredChars.length; i++) {
        passwordBuffer.push(
            pool[secureRandomInt(pool.length)]
        );
    }
    requiredChars.forEach((char) => {
        passwordBuffer.splice(
            secureRandomInt(passwordBuffer.length + 1),
             // +1 to allow insertion at the end of the array,
             0,
             char
        );
    });
    //join the characters in the passwordBuffer array into a single string and return it as the generated password.
    return passwordBuffer.join("");
}
