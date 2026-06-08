/* this file is responsible for handling the user interface and interactions of the password generator application. 
It imports the necessary functions from other modules, 
initializes variables, and sets up event listeners 
for user actions such as generating a new password and copying it to the clipboard.
 The code ensures that the generated password is displayed to the user and provides feedback when the password is copied successfully.
@returns {void} This function does not return a value but updates the user interface with the generated password and handles user interactions.
*/

import {generatePassword } from "./generate.js";
import { estimateEntropyBits } from "./entropy.js";

//Initial variable initialization
const password = generatePassword({
    length: 20,
    lowerCase: true,
    upperCase: true,
    digits: true,
    symbols: true,
});

const characterSetSize = 26 + 26 + 10 + 24; // lowercase + uppercase + digits + symbols
const entropy = estimateEntropyBits(20, characterSetSize)
const passwordOutput = document.getElementById("output");
const generatePasswordButton = document.getElementById("generateButton");
const modal = document.getElementById('messageModal');

generatePasswordButton.style.cursor = "pointer"


//Event listeners 
generatePasswordButton.addEventListener("click", () => {
    const password = generatePassword({
        length: 20,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: true,
    });
    const characterSetSize = 26 + 26 + 10 + 24; // lowercase + uppercase + digits + symbols
    const entropy = estimateEntropyBits(20, characterSetSize);
    output.textContent = password;
});

passwordOutput.addEventListener("click", async () => {
        await navigator.clipboard.writeText(passwordOutput.textContent);
        if (output.textContent === "") return; // Don't show modal if there's no password to copy 
        passwordOutput.style.cursor = "pointer";
        modal.showModal(); 
});

modal.addEventListener('click', (event) => {
  const rect = modal.getBoundingClientRect();
  if (event.target.tagName !== 'BUTTON') {
    modal.close();
  }
});