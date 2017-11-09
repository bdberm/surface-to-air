import CrossHair from './crosshair';
import Cannon from './cannon';
import {calcUnitVector, calcPosDistAway} from './util';

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


    this.ctx.clearRect(0,0, this.gameWidth, this.gameHeight);
    this.crossHair.render(this.ctx);
    this.renderCannon();

    window.requestAnimationFrame(() =>
    this.render(this.gameWidth, this.gameHeight));
  }

  renderCannon() {
    const cannonStart = this.mainCannon.startPos;
    const cannonVector = calcUnitVector(cannonStart, this.crossHair.pos);
    const cannonEndPos = calcPosDistAway(cannonStart, cannonVector, this.mainCannon.length);
    this.mainCannon.render(this.ctx, cannonEndPos);
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
