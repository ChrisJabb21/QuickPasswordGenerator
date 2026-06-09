/* this file is responsible for handling the user interface and interactions of the password generator application. 
It imports the necessary functions from other modules, 
initializes variables, and sets up event listeners 
for user actions such as generating a new password and copying it to the clipboard.
 The code ensures that the generated password is displayed to the user and provides feedback when the password is copied successfully.
@returns {void} This function does not return a value but updates the user interface with the generated password and handles user interactions.
*/

import { generatePassword } from "./generate.js";
import { estimateEntropyBits } from "./entropy.js";

const CONFIG = {
  SECURITY_PRESETS: {
    moderate: 15,
    default: 20,
    strong: 24,
    highSecurity: 32,
    quantumResistant: 40
  },
  CHARACTER_SET_SIZE: 26 + 26 + 10 + 24, // lowercase + uppercase + digits + symbols
  PASSWORD_COUNT: 2 // number of passwords to generate
};

const entropy = estimateEntropyBits(20, CONFIG.CHARACTER_SET_SIZE);

const passwordOutputs = [
  document.getElementById("password0"),
  document.getElementById("password1")
];


passwordOutputs.forEach((output) => {
  output.style.cursor = "pointer";
});

const generatePasswordsButton = document.getElementById("generateButton");
const modal = document.getElementById('messageModal');
const selectedLengthElement = document.getElementById("passwordLength")

//Event listeners 
generatePasswordsButton.addEventListener("click", () => {
  
  const selectedLength = selectedLengthElement.value

  const passwords = passwordOutputs.map(() => {
    return generatePassword({
      length: CONFIG.SECURITY_PRESETS[selectedLength]
    });
  });

  passwordOutputs.forEach((output, index) => {
    output.textContent = passwords[index];
    output.addEventListener("click", async () => {

      if (passwordOutputs.textContent === "") return; // Don't show modal if there's no password to copy 
      try {
        await navigator.clipboard.writeText(output.textContent);
        modal.showModal();
      } catch (error) {
        console.error("Failed to copy password:", error);
      }
    });
  });
});

modal.addEventListener('click', (event) => {
  if (event.target.tagName !== 'BUTTON') {
    modal.close();
  }
});