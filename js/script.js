/*----- constants -----*/
const choices = ['y', 'r', 'g', 'b'];

/*----- app's state (variables) -----*/
let cSequence = [];
let pSequence = [];
let round = 0;
let index = 0;

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
    nextRound();
}
function nextRound() {
    round += 1;
    roundDisplay.innerText = `Round ${round}`;
    const nextSequence = choices[Math.floor(Math.random() * choices.length)];
    cSequence.push(nextSequence);
    playSequence(cSequence);
}
function playSequence(sequence) {
    infoDisplay.innerText = `Wait for computer to play`;
    while (index !== sequence.length) {
        arrOfColors.forEach((color) => {
            if (sequence[index] === color.id) {
                let colorIdx = arrOfColors.indexOf(color);
                setTimeout(() => {
                    arrOfColors[colorIdx].style.borderColor = 'white';
                }, (index + 1) * 1000);
                setTimeout(() => {
                    arrOfColors[colorIdx].style.borderColor = 'black';
                }, (index + 1.5) * 1000);
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
    }, (round + 1) * 1000);
}

