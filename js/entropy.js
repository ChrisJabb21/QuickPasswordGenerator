/**
Provides a function to estimate the entropy of a generated password based on its length and the size of the character set used.
@param length: The length of the password.
@param characterSetSize: The number of unique characters in the character set used to generate the password.
@returns: The estimated entropy in bits, calculated using the formula: entropy = length * log2(characterSetSize).   
*/

export function estimateEntropyBits(length, characterSetSize) {
    return Math.round(
        length * Math.log2(characterSetSize)
    );
}