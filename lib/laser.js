import {calcUnitVector, calcPosDistAway} from './util.js';

const LASER_LENGTH = 15;
const LASER_WIDTH = 5;
const LASER_COLOR = "#49fb35";
const LASER_VEL = 5;




class Laser {
  constructor(startPos, endVectorPos) {
    this.startPos = startPos;
    this.length = LASER_LENGTH;
    this.width = LASER_WIDTH;
    this.color = LASER_COLOR;
    this.vel = LASER_VEL;
    this.unitVector = calcUnitVector(startPos, endVectorPos);
    this.endPos = calcPosDistAway(startPos, this.unitVector, this.length);
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
    this.startPos = calcPosDistAway(this.startPos, this.unitVector, this.vel);
    this.endPos = calcPosDistAway(this.endPos, this.unitVector, this.vel);
  }
}

export default Laser;
