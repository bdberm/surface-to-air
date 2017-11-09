import Board from './board';
import {calcDist} from './util';

const gameWidth = 500;
const gameHeight = 300;
const windowWidth = Math.max(window.windowWidth, gameWidth);
const windowHeight = Math.max(window.windowHeight, gameHeight);


document.addEventListener("DOMContentLoaded",() => {

  const canvas = document.getElementById('canvas');
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  const gameBoard = new Board(canvas);


  gameBoard.render();

  canvas.addEventListener("mousemove", (e) => {

    const coords = [e.offsetX, e.offsetY];
    gameBoard.crossHair.pos = coords;

  });

  canvas.addEvenListener("click", (e) => {
    
  });

});
