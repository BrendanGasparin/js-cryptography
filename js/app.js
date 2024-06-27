function changeAlgorithm() {
    const algorithm = document.querySelector('.algorithm-selector').value;

    if (algorithm === "rot") {
        document.querySelector('.rot-div').style.display = 'flex';
    }
    else {
        document.querySelector('.rot-div').style.display = 'none';
    }
}

function encrypt(event) {
    event.preventDefault();
    const algorithm = document.querySelector('.algorithm-selector').value;

    if (algorithm === "rot") {
        rotEncryption();
    }
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
        console.log("Plaintext character is " + char);
        if (isAlphabeticalUpper.test(plaintext[i])) {
            ciphertext += String.fromCharCode(((char.charCodeAt(0) - 65 + rotNumber) % 26) + 65);
        }
        else if (isAlphabeticalLower.test(plaintext[i])) {
            ciphertext += String.fromCharCode(((char.charCodeAt(0) - 97 + rotNumber) % 26) + 97);
        }
        else {
            ciphertext += char;
        }
        console.log("Ciphertext character is " + ciphertext[i]);
    }

    ciphertextArea.value = ciphertext;
}

function setupEvents() {
    document.querySelector('.algorithm-selector').addEventListener('change', changeAlgorithm);
    document.querySelector('.encrypt-button').addEventListener('click', encrypt);
}

document.addEventListener('DOMContentLoaded', setupEvents);