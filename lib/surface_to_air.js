import Board from './board';
import * as Collisons from './collisions';

const gameWidth = 800;
const gameHeight = 500;
const windowWidth = Math.max(window.windowWidth, gameWidth);
const windowHeight = Math.max(window.windowHeight, gameHeight);


document.addEventListener("DOMContentLoaded",() => {
  window.Collisions = Collisons;
  const canvas = document.getElementById('canvas');
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  const gameBoard = new Board(canvas);
  const laserShot = new Audio("./assets/laser.wav");


  gameBoard.render();

  canvas.addEventListener("mousemove", (e) => {

    const coords = [e.offsetX, e.offsetY];
    gameBoard.crossHair.pos = coords;

  });

  canvas.addEventListener("click", (e) => {
    gameBoard.addLaser();
    laserShot.play();
  });

});
