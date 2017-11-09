import Board from './board';
import {calcCannonEndPoint} from './util';

const gameWidth = 500;
const gameHeight = 300;
const windowWidth = Math.max(window.windowWidth, gameWidth);
const windowHeight = Math.max(window.windowHeight, gameHeight);


document.addEventListener("DOMContentLoaded",() => {

  const canvas = document.getElementById('canvas');
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  const ctx = canvas.getContext('2d');
  const gameBoard = new Board(ctx);


  gameBoard.render(gameWidth, gameHeight);

  canvas.addEventListener("mousemove", (e) => {
    const coords = [e.offsetX, e.offsetY];
    gameBoard.crossHair.X = e.offsetX;
    gameBoard.crossHair.Y = e.offsetY;
    const slope = calcCannonEndPoint(gameWidth/2, coords );
    console.log(slope);
  });


});
