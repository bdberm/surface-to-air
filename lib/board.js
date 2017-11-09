import CrossHair from './crosshair';
import Cannon from './cannon';
import {calcPointBetween, calcUnitVector} from './util';

class Board {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.crossHair = new CrossHair();
    this.mainCannon = new Cannon([canvas.width/2, canvas.height]);
    this.render = this.render.bind(this);
  }

  render() {
    const cannonStart = this.mainCannon.startPos;

    this.ctx.clearRect(0,0, this.gameWidth, this.gameHeight);
    this.crossHair.render(this.ctx);

    const cannonVector = calcUnitVector(cannonStart, this.crossHair.pos);
    const cannonEndX = cannonStart[0] + (cannonVector[0] * this.mainCannon.length);
    const cannonEndY = cannonStart[1] + (cannonVector[1] * this.mainCannon.length);

    const cannonEndPos = [cannonEndX, cannonEndY];
    this.mainCannon.render(this.ctx, cannonEndPos);


    window.requestAnimationFrame(() => this.render(this.gameWidth, this.gameHeight));
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
