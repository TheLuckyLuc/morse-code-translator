const english = document.querySelector('#translator__english--text');
const morseCode = document.querySelector('#translator__morse--text');
const result = document.querySelector('#translator__result--text');

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
    // replace the value of the morse code textarea with the translated string
    result.textContent = str.join(' ');
}

morseCode.addEventListener('input', function() {
    const strArray = morseCode.value.split(' ');

    getKeyByValue(morse, strArray);
});

function getKeyByValue(obj, valueArray) {
    const str = [];

    for (const item of valueArray) {
        item.trim();
        const key = Object.keys(obj).find(key => obj[key] === item);
        item === '|' ? str.push(' ')
        : key === undefined ? null
        : str.push(key);
    }
    result.textContent = str.join('').toUpperCase();
}
