import {calcUnitVector, findEndPos} from './util.js';

const LASER_LENGTH = 15;
const LASER_WIDTH = 5;
const LASER_COLOR = "#49fb35";
const LASER_VEL = 3;




class Laser {
  constructor(startPos, endVectorPos) {
    this.startPos = startPos;
    this.length = LASER_LENGTH;
    this.width = LASER_WIDTH;
    this.color = LASER_COLOR;
    this.unitVector = calcUnitVector(startPos, endVectorPos);
    this.endPos = findEndPos(startPos, this.unitVector, this.length);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  move() {

  }




}
