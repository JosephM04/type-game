"use strict";

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const endGameDiv = document.querySelector('.div-end-game');
const settingsBtn = document.getElementById('settings-btn');
const btnCLose = document.querySelector('.btn-close');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const btnStart = document.getElementById("btn-start");

//list of words for game

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// init word 
let randomWord;

//init score
let score = 0;

//init time
let time = 5;

timeEl.innerHTML = `${time}s`;
// Set difficulty to value in ls or medium
let difficulty =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

// Set difficulty select value
difficultySelect.value =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';
//focus on text on start



//star counting down when click bottom
btnStart.addEventListener("click", () => {
    addWordToDOM();
    text.removeAttribute("disabled");
    text.focus();
    const timeInterval = setInterval(updateTime, 1000);
    btnStart.style.display = "none";
    function updateTime() {
        time--;
        timeEl.innerHTML = time + 's';
    
        if (time == 0) {
            word.innerHTML= "";
            text.setAttribute("disabled","")
            timeEl.innerHTML = time;
            clearInterval(timeInterval);
            //end game
            gameOver();
        }
    }
});

btnCLose.addEventListener("click", () => {
    endGameDiv.style.display = 'none';
    time = 5;
    score = 0;
    scoreEl.innerHTML = score;
    timeEl.innerHTML = time;
    btnStart.style.display = "inline";
})

// generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {

    // remove all old elements
    while (word.firstChild) {
        word.removeChild(word.firstChild);
    }

    randomWord = getRandomWord();
    let arr = randomWord.split("").map(value => {
        // wrap the characters in a span tag
        return `<span class="quote-chars">${value}</span>`
    });
    word.innerHTML += arr.join("");
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//game over pop up

function gameOver() {
    endGameEl.innerHTML = `
    <h1> Time ran out </h1>
    <p> Your final score is ${score}</p>
    `;
    endGameDiv.style.display = 'flex';
}

//Event Listeners

//typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    //comparing the input words with quote
    let quoteChars = document.querySelectorAll(".quote-chars");

    //create an array from received span tags
    quoteChars = Array.from(quoteChars);

    // array of uset input characters
    let userInputChars = text.value.split("");
    console.log(userInputChars);
    //Loop through each character in quote
    quoteChars.forEach((char, index) => {
        //chet if char (quote charater) = user input Character(text)[index](input character)
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        //if user hasn't entered anything or backspaced
        else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        else {
            if (!char.classList.contains("fail")) {
                //increment and display mistakes
                char.classList.add("fail");
            }
        }
    })

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        //clear 
        e.target.value = '';

        if (difficulty === 'hard') { time += 1; }
        else if (difficulty === 'medium') { time += 3; }
        else { time += 8; }
    }
});

// Setting select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});