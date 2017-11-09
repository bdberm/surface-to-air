import CrossHair from './crosshair';
import Cannon from './cannon';
import Laser from './laser';
import {calcUnitVector} from './util';

class Board {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.crossHair = new CrossHair();
    this.mainCannon = new Cannon([canvas.width/2, canvas.height]);
    this.lasers = [];
    this.render = this.render.bind(this);
  }

  render() {


    this.ctx.clearRect(0,0, this.gameWidth, this.gameHeight);
    this.crossHair.render(this.ctx);
    this.renderCannon();
    this.renderLasers();

    window.requestAnimationFrame(() =>
    this.render(this.gameWidth, this.gameHeight));
  }

  renderCannon() {
    const cannonStart = this.mainCannon.startPos;
    const crossHairVector = calcUnitVector(cannonStart, this.crossHair.pos);
    this.mainCannon.calcEndPoint(crossHairVector);
    this.mainCannon.render(this.ctx);
  }

  renderLasers() {
    this.lasers.forEach((laser) => {
      laser.move();
      laser.render(this.ctx);
    });
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
