import {generatePassword } from "./generate.js";
import { estimateEntropyBits } from "./entropy.js";

const password = generatePassword({
    length: 20,
    lowerCase: true,
    upperCase: true,
    digits: true,
    symbols: true,
});
const characterSetSize = 26 + 26 + 10 + 24; // lowercase + uppercase + digits + symbols
const entropy = estimateEntropyBits(20, characterSetSize);

const button = document.getElementById("generateButton");
const output = document.getElementById("output");
button.addEventListener("click", () => {
    const password = generatePassword({
        length: 20,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: true,
    });
    const characterSetSize = 26 + 26 + 10 + 24; // lowercase + uppercase + digits + symbols
    const entropy = estimateEntropyBits(20, characterSetSize);
console.log("Estimated entropy ");
console.log(`${entropy} bits`);
console.log("Generated password:");
console.log(password);
output.textContent = password;
});
