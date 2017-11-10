import {calcUnitVector, calcPosDistAway} from './util.js';

const CANNON_LENGTH = 50;
const CANNON_WIDTH = 15;
const CANNON_COLOR = "#43464B";



class Cannon {
  constructor(startPos) {
    this.width = CANNON_WIDTH;
    this.length = CANNON_LENGTH;
    this.color = CANNON_COLOR;
    this.startPos = startPos;
    this.endPos = [startPos[0], startPos[1] - this.length];

  }

  render(ctx) {

    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();


    ctx.fillRect(this.startPos[0]-20, this.startPos[1]-10, 40, 10);

  }

  calcEndPoint(unitVector) {
    this.endPos = calcPosDistAway(this.startPos, unitVector, this.length);
  }

}

export default Cannon;
