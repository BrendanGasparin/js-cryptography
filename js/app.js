// Warn that substitution cipher must be 26 alphabetical characters
function alphabetWarning() {
    document.querySelector('.error-box').style.display = "block";
    document.querySelector('.error-message').innerHTML = "Cipher must be 26 alphabetical characters.";
}

// Handles when the user changes the algorithm
function changeAlgorithm() {
    const algorithm = document.querySelector('.algorithm-selector').value;

    if (algorithm === "rot") {
        document.querySelector('.rot-div').style.display = 'flex';
        document.querySelector('.substitution-div').style.display = 'none';
    }
    else if (algorithm === "substitution") {
        document.querySelector('.substitution-div').style.display = 'flex';
        document.querySelector('.rot-div').style.display = 'none';
    }
    else {
        document.querySelector('.rot-div').style.display = 'none';
        document.querySelector('.substitution-div').style.display = 'none';
    }
}

// Handles the decrypt button being pressed
function decrypt(event) {
    event.preventDefault();
    const algorithm = document.querySelector('.algorithm-selector').value;
    const errorBox = document.querySelector('.error-box');

    if (algorithm === "none") {
        errorBox.style.display = "block"
        document.querySelector(".error-message").innerHTML = "You must select an algorithm";
    }
    else if (algorithm === "rot") {
        errorBox.style.display = "none";
        rotDecryption();
    }
    else if (algorithm === "substitution") {
        errorBox.style.display = "none";
        substitutionDecryption();
    }
}

// Handles the encrypt button being pressed
function encrypt(event) {
    event.preventDefault();
    const algorithm = document.querySelector('.algorithm-selector').value;
    const errorBox = document.querySelector('.error-box');

    if (algorithm === "none") {
        document.querySelector('.error-box').style.display = "block";
        document.querySelector(".error-message").innerHTML = "You must select an algorithm";
    }
    else if (algorithm === "rot") {
        errorBox.style.display = "none";
        rotEncryption();
    }
    else if (algorithm === "substitution") {
        errorBox.style.display = "none";
        substitutionEncryption();
    }
}

// Decrypts using Caesar cipher
function rotDecryption() {
    const rotNumber = parseInt(document.querySelector('.rot-number').value, 10);
    const cipherText = document.querySelector('.ciphertext').value;
    const plainTextArea = document.querySelector('.plaintext');
    const length = cipherText.length;
    const isAlphabeticalUpper = /^[A-Z]/;
    const isAlphabeticalLower = /^[a-z]/;
    let plainText = '';
    
    for (let i = 0; i < length; i++) {
        const char = cipherText[i];

        if (isAlphabeticalUpper.test(char)) {
            plainText += String.fromCharCode(((char.charCodeAt(0) - 65 + 26 - rotNumber) % 26) + 65);
        }
        else if (isAlphabeticalLower.test(char)) {
            plainText += String.fromCharCode(((char.charCodeAt(0) - 97 + 26 - rotNumber) % 26) + 97);
        }
        else {
            plainText += char;
        }
    }

    plainTextArea.value = plainText;
}

// Encrypts using Caesar cipher
function rotEncryption() {
    const rotNumber = parseInt(document.querySelector('.rot-number').value, 10);
    const plaintext = document.querySelector('.plaintext').value;
    const ciphertextArea = document.querySelector('.ciphertext');
    const length = plaintext.length;
    const isAlphabeticalUpper = /^[A-Z]/;
    const isAlphabeticalLower = /^[a-z]/;
    let ciphertext = '';
    
    for (let i = 0; i < length; i++) {
        const char = plaintext[i];
 
        if (isAlphabeticalUpper.test(char)) {
            ciphertext += String.fromCharCode(((char.charCodeAt(0) - 65 + rotNumber) % 26) + 65);
        }
        else if (isAlphabeticalLower.test(char)) {
            ciphertext += String.fromCharCode(((char.charCodeAt(0) - 97 + rotNumber) % 26) + 97);
        }
        else {
            ciphertext += char;
        }
    }

    ciphertextArea.value = ciphertext;
}

// Initial event listener setup
function setupEvents() {
    document.querySelector('.algorithm-selector').addEventListener('change', changeAlgorithm);
    document.querySelector('.encrypt-button').addEventListener('click', encrypt);
    document.querySelector('.decrypt-button').addEventListener('click', decrypt);
}

// Decrypts using substitution cipher
function substitutionDecryption() {
    console.log("Running substitutionDecryption()");
    const plainTextarea = document.querySelector('.plaintext');
    const ciphertext = document.querySelector('.ciphertext').value;
    const cipher = document.querySelector('.substitution-textarea').value;
    const length = ciphertext.length;
    const isAlphabeticalUpper = /^[A-Z]/;
    const isAlphabeticalLower = /^[a-z]/;
    const cipherLength = 26;
    let plaintext = "";
    let alphabetCount = new Array(cipherLength);

    // Check cipher is the correct length
    if (cipher.length !== cipherLength) {
        alphabetWarning();
        return;
    }

    // Initialize the count of letters
    for (let i = 0; i < cipherLength; i++) {
        alphabetCount[i] = 0;
    }

    // Check cipher is all alphabetical characters and that none repeat
    for (let i = 0; i < cipherLength; i++) {
        const char = cipher[i].toUpperCase();
        if (isAlphabeticalLower.test(char) === false && isAlphabeticalUpper.test(char) === false) {
            alphabetWarning();
            return;
        }
        alphabetCount[char.charCodeAt(0) - 65]++;
    }
    for (let i = 0; i < cipherLength; i++) {
        if (alphabetCount[i] !== 1) {
            document.querySelector('.error-box').style.display = "block";
            document.querySelector('.error-message').innerHTML = "Cipher must not contain repeating letters.";
            return;
        }
    }

    // Decrypt ciphertext to plaintext using cipher
    for (let i = 0; i < length; i++) {
        const char = ciphertext[i];

        if (isAlphabeticalUpper.test(char) || isAlphabeticalLower.test(char)) {
            let uppercase = true;

            if (isAlphabeticalLower.test(char))
                uppercase = false;

            for (let j = 0; j < cipherLength; j++) {
                if (cipher[j].toUpperCase() === char.toUpperCase()) {
                    if (uppercase) {
                        plaintext += String.fromCharCode(65 + j);
                        break;
                    }
                    else {
                        plaintext += String.fromCharCode(97 + j);
                        break;
                    }
                }
            }
        }
        else
            plaintext += ciphertext[i];
    }

    // Write plaintext to output
    plainTextarea.value = plaintext;
}

// Encrypts using substitution cipher
function substitutionEncryption() {
    const plaintext = document.querySelector('.plaintext').value;
    const cipherTextarea = document.querySelector('.ciphertext');
    const cipher = document.querySelector('.substitution-textarea').value;
    const length = plaintext.length;
    const isAlphabeticalUpper = /^[A-Z]/;
    const isAlphabeticalLower = /^[a-z]/;
    const cipherLength = 26;
    let ciphertext = "";
    let alphabetCount = new Array(cipherLength);
    let isCharactersRepeat = false;

    // Check cipher is the correct length
    if (cipher.length !== cipherLength) {
        alphabetWarning();
        return;
    }

    // Initialize the count of letters
    for (let i = 0; i < cipherLength; i++) {
        alphabetCount[i] = 0;
    }

    // Check cipher is all alphabetical characters and that none repeat
    for (let i = 0; i < cipherLength; i++) {
        const char = cipher[i].toUpperCase();
        if (isAlphabeticalLower.test(char) === false && isAlphabeticalUpper.test(char) === false) {
            alphabetWarning();
            return;
        }
        alphabetCount[char.charCodeAt(0) - 65]++;
    }
    for (let i = 0; i < cipherLength; i++) {
        if (alphabetCount[i] !== 1) {
            document.querySelector('.error-box').style.display = "block";
            document.querySelector('.error-message').innerHTML = "Cipher must not contain repeating letters.";
            return;
        }
    }

    // Encrypt plaintext to ciphertext using cipher
    const plaintextLength = plaintext.length;
    for (let i = 0; i < plaintextLength; i++) {
        let char = plaintext[i];

        if (isAlphabeticalLower.test(char) == false && isAlphabeticalUpper.test(char) == false) {
            ciphertext += char;
        }
        else if (isAlphabeticalLower.test(char))
        {
            ciphertext += cipher[char.charCodeAt(0) - 97].toLowerCase();
        }
        else {
            ciphertext += cipher[char.charCodeAt(0) - 65].toUpperCase();
        }
    }

    cipherTextarea.value = ciphertext;
}

document.addEventListener('DOMContentLoaded', setupEvents);