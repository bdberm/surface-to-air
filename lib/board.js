import CrossHair from './crosshair';
import Cannon from './cannon';
import Laser from './laser';
import Bomb from './bomb';
import {calcUnitVector, RandomStartPos, RandomEndPos} from './util';

const INTERVAL = 1500;

class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.crossHair = new CrossHair();
    this.mainCannon = new Cannon([canvas.width/2, canvas.height]);
    this.lasers = [];
    this.bombs = [];
    // this.bomb = new Bomb(RandomStartPos(this.width), RandomEndPos(this.width,this.height));
    this.render = this.render.bind(this);
    this.generateBombs();
  }

  generateBombs() {

    window.setInterval(() => {
      const newBomb = new Bomb(RandomStartPos(this.width), RandomEndPos(this.width,this.height));
      this.bombs.push(newBomb);
    },INTERVAL);

  }



  addLaser() {
    const newLaser = new Laser(this.mainCannon.endPos, this.crossHair.pos);
    this.lasers.push(newLaser);
  }

  render() {


    this.ctx.clearRect(0,0, this.width, this.height);
    this.crossHair.render(this.ctx);
    this.renderCannon();
    this.renderCollection(this.lasers);
    this.renderCollection(this.bombs);



    window.requestAnimationFrame(() =>
    this.render(this.width, this.height));
  }

  renderCannon() {
    const cannonStart = this.mainCannon.startPos;
    const crossHairVector = calcUnitVector(cannonStart, this.crossHair.pos);
    this.mainCannon.calcEndPoint(crossHairVector);
    this.mainCannon.render(this.ctx);
  }



  renderCollection(array) {
    array.forEach((item) => {
      item.move();
      item.render(this.ctx);
    });
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
