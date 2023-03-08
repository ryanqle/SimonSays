/*----- constants -----*/
const choices = ['y', 'r', 'g', 'b'];
const audio = [new Audio('sound/a6.mp3'), new Audio('sound/b6.mp3'), new Audio('sound/c6.mp3'), new Audio('sound/e6.mp3')];
const introMusic = new Audio('sound/intro.mp3');
introMusic.volume = .2;
const gameOverSound = new Audio('sound/gameover.mp3');
gameOverSound.volume = .2;
const textDisplay = {
    difficulty: [`Let's make things more interesting`, `Don't get cocky now`, `FASTER!`],
    cheer: [`Awesome!!`, `Nice!`, `Sweet!`, `Respect!`, `SLAAAAAAAY`]
}

/*----- app's state (variables) -----*/
let cSequence = [];
let pSequence = [];
let round = 0;
let index = 0;
let increaseDifficulty = false;
let timeoutTime = 1000;

/*----- cached element references -----*/
const btn = document.getElementById('play');
const playArea = document.getElementById('play-area');
const board = document.getElementById('board');
const colors = document.querySelectorAll('.color');
const arrOfColors = Array.from(colors);
const roundDisplay = document.querySelector('h1');
const infoDisplay = document.querySelector('h2');

/*----- event listeners -----*/
playArea.addEventListener('click', handleClick);

/*----- functions -----*/
function handleClick(evt) {
    let playerAction = evt.target;
    // HANDLE GUARD
    // if click was not on a button the the color div/button
    // do nothing
    if (playerAction.tagName !== 'BUTTON' && playerAction.className !== 'color') {
        return;
    }
    else if (playerAction.tagName === 'BUTTON') {
        handleButton(playerAction);
    }
    else {
        handleColorSelection(playerAction.id);
    }
}
// HANDLE BUTTON PRESS
// On first click
// Will hide the button on press and reuse the button and update text to 'PLAY AGAIN'
// Play intro sequence by calling introStartSequence function
// Subsequent clicks will result in normal play again
function handleButton(btn) {
    if(btn.innerText === 'START'){
        btn.style.visibility = 'hidden';
        btn.innerText = 'PLAY AGAIN';
        introStartSequence();
        setTimeout(() => {
            init();
        }, 5500);
        return;
    }
    else{
        btn.style.visibility = 'hidden';
        init();
    }
}
// HANDLE COLOR SELECTION
// Will add the new color of the player's choice and check
// If incorrect color selection, handle game over
// If all sequence is correct, call next round
// On click display animation and sound
function handleColorSelection(colorClicked) {
    pSequence.push(colorClicked)
    let index = pSequence.length - 1;
    if (pSequence[index] !== cSequence[index]) {
        infoDisplay.innerText = 'GAME OVER';
        gameOverSound.play();
        btn.style.visibility = 'visible';
        board.classList.toggle('unclickable');
        return;
    }
    if (pSequence.length === cSequence.length) {
        pSequence = [];
        board.classList.toggle('unclickable');
        setTimeout(() => {
            nextRound();
        }, 500);
    }
    arrOfColors.forEach((color) => {
        if (colorClicked === color.id) {
            let colorIdx = arrOfColors.indexOf(color);
            arrOfColors[colorIdx].style.borderColor = 'white';
            audio[colorIdx].play();
            indexOfLastColor = colorIdx;
            board.classList.toggle('unclickable');
            setTimeout(() => {
                arrOfColors[colorIdx].style.borderColor = 'black';
                audio[colorIdx].pause();
                audio[colorIdx].currentTime = 0;
                board.classList.toggle('unclickable');
            }, 300);

        }
    });
}
// INITIALIZE GAME
// Set variables to default values
function init() {
    cSequence = [];
    pSequence = [];
    round = 0;
    index = 0;
    timeoutTime = 1000;
    increaseDifficulty = false;
    nextRound();

}
// NEXT ROUND
// handle adding new step to computer sequence
// check difficulty
// call computer sequence animation
function nextRound() {
    const nextSequence = choices[Math.floor(Math.random() * choices.length)];
    cSequence.push(nextSequence);
    checkDifficulty();
    if (increaseDifficulty === true) {
        increaseDifficulty = false;
        infoDisplay.innerHTML = `<span style= 'color: red'>${textDisplay.difficulty[Math.floor(Math.random() * 3)]}</span>`;
        setTimeout(() => {
            displayRound();
            playSequence(cSequence);
        }, 1000)
    }
    else if (round > 1) {
        infoDisplay.innerHTML = `<span style= 'color: green'>${textDisplay.cheer[Math.floor(Math.random() * 5)]}</span>`;
        setTimeout(() => {
            displayRound();
            playSequence(cSequence);
        }, 1000)
    }
    else {
        displayRound();
        playSequence(cSequence);
    }

}
// PLAY SEQUENCE
// animation and audio for color sequence
// while loop until sequence length is met
// call playerTurn function once done
function playSequence(sequence) {
    infoDisplay.innerText = `Wait for computer to play`;
    while (index !== sequence.length) {
        arrOfColors.forEach((color) => {
            if (sequence[index] === color.id) {
                let colorIdx = arrOfColors.indexOf(color);
                setTimeout(() => {
                    arrOfColors[colorIdx].style.borderColor = 'white';
                    audio[colorIdx].play();
                }, (index + 1) * timeoutTime);
                setTimeout(() => {
                    arrOfColors[colorIdx].style.borderColor = 'black';
                    audio[colorIdx].pause();
                    audio[colorIdx].currentTime = 0;
                }, (index + 1.50) * timeoutTime);
                clearTimeout();
            }
        });
        index++;
    }
    index = 0;
    playerTurn();
}
// PLAYER TURN
// Display info of player's turn
// timeout to after computer sequence is complete
// allow player to be able to click on the board
function playerTurn() {
    setTimeout(() => {
        board.classList.toggle('unclickable');
        infoDisplay.innerText = `Your Turn`;
    }, (round + 1) * timeoutTime);
}
// DISPLAY ROUND
// update current round and display
function displayRound() {
    round++;
    roundDisplay.innerText = `Round ${round}`;
}
// CHECK DIFFICULTY
// when animation speed reaches less than .3s stop increasing difficulty
// otherwise adjust the speed after every 3 rounds
function checkDifficulty() {
    if (timeoutTime < 300) {
        increaseDifficulty = false;
        return;
    }
    else if (round % 3 === 0 && round != 0) {
        increaseDifficulty = true;
        timeoutTime *= .5;
    }
}
// INTRO SEQUENCE
// plays intro music and add 
function introStartSequence() {
    introMusic.play();
    arrOfColors.forEach((color,idx) => {
        setTimeout(() => {
            color.style.borderColor = 'white';
        }, idx * 1000)
        setTimeout(() => {
                color.style.borderColor = 'black';
            }, (idx + .75) * 1000);
        }
    );

    setTimeout(() => {
        arrOfColors[0].style.borderColor = 'white';
        arrOfColors[1].style.borderColor = 'white';
        arrOfColors[2].style.borderColor = 'white';
        arrOfColors[3].style.borderColor = 'white';
    }, 4400);
    setTimeout(() => {
        arrOfColors[0].style.borderColor = 'black';
        arrOfColors[1].style.borderColor = 'black';
        arrOfColors[2].style.borderColor = 'black';
        arrOfColors[3].style.borderColor = 'black';
        }, 5000);
    
   
}