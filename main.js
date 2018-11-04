const english = document.querySelector('#translator__english--text');
const morseCode = document.querySelector('#translator__morse--text');
const result = document.querySelector('#translator__result--text');
const englishSection = document.querySelector('#translator__english');
const morseSection = document.querySelector('#translator__morse');
const button = document.querySelector('button');

button.addEventListener('click', switchBoxes);

const morse = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
    0: '-----',
}

// listen out for a change in the input
english.addEventListener('input', function() {
    // create an array of all the input characters
    const strArray = english.value.toLowerCase().split('');
    // run the function passing in the alphabet object & array of input characters
    getValueByKey(morse, strArray);
});

// english to morse code function
// get the object values that correlate to the input keys
function getValueByKey(obj, keyArray) {
    // create an empty array
    const str = [];
    // loop through each item in the passed in string array
    for (const item of keyArray) {
        // replace spaces with '|', grab the object value if the input key exists, or don't add anyting to the array if neither condition passes
        item === ' ' ? str.push('|') : obj.hasOwnProperty(`${item}`) ? str.push(obj[item]) : null;
    }
    // set the result box with the translated string
    result.textContent = str.join(' ');
}

morseCode.addEventListener('input', function() {
    // create an array of all input characters using space as a separator
    const strArray = morseCode.value.split(' ');

    getKeyByValue(morse, strArray);
});

function getKeyByValue(obj, valueArray) {
    // create an empty array
    const str = [];
    // loop over each character in the array
    for (const item of valueArray) {
        // trim any spaces off the edges (this will let you use a space to separate letters on input)
        item.trim();
        // if there is an object that contains a key relating to the same value as the value input, set that key as the 'key' variable. 'key' will take on 'undefined' otherwise
        const key = Object.keys(obj).find(key => obj[key] === item);
        // if a '|' is input, translate that to a space
        item === '|' ? str.push(' ')
        // if the key variable takes on 'undefined' don't do anything
        : key === undefined ? null
        // push the matched key to the array if neither of the above 2 conditions apply
        : str.push(key);
    }
    // set the result box with the translated and joined string
    result.textContent = str.join('').toUpperCase();
}

function switchBoxes() {
    englishSection.classList.toggle('hide');
    morseSection.classList.toggle('hide');
    // clear all the values in the textareas
    english.value = '';
    morseCode.value = '';
    result.textContent = '';
    
    // change the inner text of the button depending on which textarea is visible
    englishSection.classList.contains('hide') ? button.innerHTML = 'Switch to English <i class="fas fa-exchange-alt"></i>'
    : button.innerHTML = 'Switch to Morse <i class="fas fa-exchange-alt"></i>';
}
