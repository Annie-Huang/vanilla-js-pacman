import {LEVEL, OBJECT_TYPE} from './setup';
// Classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';

// DOM Element
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Initial Setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

function gameOver(pacman, grid) {

}

function checkCollision(pacman, ghosts) {}

function gameLoop(pacman, ghosts) {
  console.log('works!');
}

function startGame() {
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add('hide');

  gameBoard.createGrid(LEVEL);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', e => {
    // If you don't have the => method in objectExist, you will need to bind it like this below:
    // pacman.handlekeyInput(e, gameBoard.objectExist.bind(gameBoard));
    pacman.handlekeyInput(e, gameBoard.objectExist)
  });

  timer = setInterval(() => gameLoop(pacman), GLOBAL_SPEED);
}

// Initialize game
startButton.addEventListener('click', startGame);














