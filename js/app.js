function changeAlgorithm() {
    const algorithm = document.querySelector('.algorithm-selector').value;

    if (algorithm === "rot") {
        document.querySelector('.rot-div').style.display = 'flex';
    }
    else {
        document.querySelector('.rot-div').style.display = 'none';
    }
}

function decrypt(event) {
    event.preventDefault();
    const algorithm = document.querySelector('.algorithm-selector').value;

    if (algorithm === "rot") {
        rotDecryption();
    }
}

function encrypt(event) {
    event.preventDefault();
    const algorithm = document.querySelector('.algorithm-selector').value;

    if (algorithm === "rot") {
        rotEncryption();
    }
}

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

        if (isAlphabeticalUpper.test(cipherText[i])) {
            plainText += String.fromCharCode(((char.charCodeAt(0) - 65 + 26 - rotNumber) % 26) + 65);
        }
        else if (isAlphabeticalLower.test(cipherText[i])) {
            plainText += String.fromCharCode(((char.charCodeAt(0) - 97 + 26 - rotNumber) % 26) + 97);
        }
        else {
            plainText += char;
        }
    }

    plainTextArea.value = plainText;
}

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
 
        if (isAlphabeticalUpper.test(plaintext[i])) {
            ciphertext += String.fromCharCode(((char.charCodeAt(0) - 65 + rotNumber) % 26) + 65);
        }
        else if (isAlphabeticalLower.test(plaintext[i])) {
            ciphertext += String.fromCharCode(((char.charCodeAt(0) - 97 + rotNumber) % 26) + 97);
        }
        else {
            ciphertext += char;
        }
    }

    ciphertextArea.value = ciphertext;
}

function setupEvents() {
    document.querySelector('.algorithm-selector').addEventListener('change', changeAlgorithm);
    document.querySelector('.encrypt-button').addEventListener('click', encrypt);
    document.querySelector('.decrypt-button').addEventListener('click', decrypt);
}

document.addEventListener('DOMContentLoaded', setupEvents);