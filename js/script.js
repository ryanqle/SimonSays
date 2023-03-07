/*----- constants -----*/
const choices = ['y', 'r', 'g', 'b'];

/*----- app's state (variables) -----*/
let cSequence = [];
let pSequence = [];
let round = 0;
winner = false;

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

function init() {
    cSequence = [];
    pSequence = [];
    round = 0;
    nextRound();

}

function handleButton(btn) {
    if (btn === btnStart) {
        btnStart.style.visibility = 'hidden';
        init();

    }
    else if (btn === btnReset) {
        btnReset.style.visibility = 'hidden';
        init();
    }
    index = 0;
    playerTurn();
}

function handlePlayerAction(colorClicked) {

}

