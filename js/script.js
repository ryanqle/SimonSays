/*----- constants -----*/
const choices = ['y', 'r', 'g', 'b'];
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
    if (playerAction.tagName !== 'BUTTON' && playerAction.className !== 'board color') {
        return;
    }
    else if (playerAction.tagName === 'BUTTON') {
        handleButton(playerAction);
    } else {
        handlePlayerAction(playerAction.id);
    }
}
function handleButton(btn) {
    btn.style.visibility = 'hidden';
    if (round === 0) {
        btn.innerText = 'PLAY AGAIN';
    }
    init();
}
function handlePlayerAction(colorClicked) {
    pSequence.push(colorClicked)
    let index = pSequence.length - 1;
    if (pSequence[index] !== cSequence[index]) {
        infoDisplay.innerText = 'GAME OVER';
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
            indexOfLastColor = colorIdx;
            setTimeout(() => {
                arrOfColors[colorIdx].style.borderColor = 'black';
            }, 200);
        }
    });
}
function init() {
    cSequence = [];
    pSequence = [];
    round = 0;
    index = 0;
    timeoutTime = 1000;
    increaseDifficulty = false;
    nextRound();
}
function nextRound() {
    const nextSequence = choices[Math.floor(Math.random() * choices.length)];
    cSequence.push(nextSequence);
    if (round % 3 === 0 && round !== 0) {
        infoDisplay.innerText = textDisplay.difficulty[Math.floor(Math.random() * 3)];
        setTimeout(() => {
            displayRound();
            timeoutTime *= .75;
            playSequence(cSequence);
        }, 1000)

    }
    else if (round > 1) {
        infoDisplay.innerText = textDisplay.cheer[Math.floor(Math.random() * 3)];
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
function playSequence(sequence) {

    console.log(sequence);

    infoDisplay.innerText = `Wait for computer to play`;
    while (index !== sequence.length) {
        arrOfColors.forEach((color) => {
            if (sequence[index] === color.id) {
                let colorIdx = arrOfColors.indexOf(color);
                setTimeout(() => {
                    arrOfColors[colorIdx].style.borderColor = 'white';
                }, (index + 1) * timeoutTime);
                setTimeout(() => {
                    arrOfColors[colorIdx].style.borderColor = 'black';
                }, (index + 1.50) * timeoutTime);
                clearTimeout();
            }
        });
        index++;
    }
    index = 0;
    playerTurn();
}

function playerTurn() {
    setTimeout(() => {
        board.classList.toggle('unclickable');
        infoDisplay.innerText = `Your Turn`;
    }, (round + 1) * timeoutTime);
}

function displayRound() {
    round++;
    roundDisplay.innerText = `Round ${round}`;
}