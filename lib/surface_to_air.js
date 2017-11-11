import Board from './board';
import Game from './game';

const gameWidth = 800;
const gameHeight = 500;
const windowWidth = Math.max(window.windowWidth, gameWidth);
const windowHeight = Math.max(window.windowHeight, gameHeight);


document.addEventListener("DOMContentLoaded",() => {
  const canvas = document.getElementById('canvas');
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  const gameBoard = new Board(canvas);
  const game = new Game(gameBoard, canvas);
  const laserShot = new Audio("./assets/laser.wav");



});
