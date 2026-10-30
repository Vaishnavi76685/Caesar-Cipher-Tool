 
// Get HTML Elements
const inputText = document.getElementById("inputText");
const shiftKey = document.getElementById("shiftKey");
const outputText = document.getElementById("outputText");

const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");


// Caesar Cipher Function
function caesarCipher(text, shift) {

    let result = "";

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        // Check uppercase letters
        if (char >= 'A' && char <= 'Z') {

            let code = char.charCodeAt(0);

            let newCode = ((code - 65 + shift) % 26) + 65;

            result += String.fromCharCode(newCode);
        }

        // Check lowercase letters
        else if (char >= 'a' && char <= 'z') {

            let code = char.charCodeAt(0);

            let newCode = ((code - 97 + shift) % 26) + 97;

            result += String.fromCharCode(newCode);
        }

        // Keep spaces, numbers and special characters unchanged
        else {
            result += char;
        }
    }

    return result;
}


// Validate Input and Shift Key
function getValidInput() {

    let text = inputText.value;
    let shift = Number(shiftKey.value);

    if (text.trim() === "") {
        alert("Please enter a message!");
        return null;
    }

    if (
        shiftKey.value.trim() === "" ||
        !Number.isInteger(shift) ||
        shift < 1 ||
        shift > 25
    ) {
        alert("Please enter a valid shift key between 1 and 25!");
        return null;
    }

    return { text, shift };
}


// Encrypt Button
encryptBtn.addEventListener("click", function () {

    let data = getValidInput();

    if (data === null) {
        return;
    }

    outputText.value = caesarCipher(data.text, data.shift);
});


// Decrypt Button
decryptBtn.addEventListener("click", function () {

    let data = getValidInput();

    if (data === null) {
        return;
    }

    outputText.value = caesarCipher(data.text, 26 - data.shift);
});


// Copy Button
copyBtn.addEventListener("click", async function () {

    if (outputText.value === "") {
        alert("There is no result to copy!");
        return;
    }

    try {
        await navigator.clipboard.writeText(outputText.value);
        alert("Result copied successfully!");
    } catch (error) {
        outputText.select();
        document.execCommand("copy");
        alert("Copy attempted. Please check your clipboard.");
    }
});


// Clear Button
clearBtn.addEventListener("click", function () {

    inputText.value = "";
    outputText.value = "";
    shiftKey.value = 3;

});
   