import {calcUnitVector, calcPosDistAway} from './util.js';

const LASER_LENGTH = 25;
const LASER_WIDTH = 3;
const LASER_COLOR = "#ff0101";
const LASER_VEL = 10;

const LASER_COLORS = {
  1: "#ff0101",
  2: "#49fb35",
  3: "#ccff15",
  0: "#c32aff"
};

class Laser {
  constructor(startPos, endVectorPos, level) {
    this.startPos = startPos;
    this.length = LASER_LENGTH;
    this.width = LASER_WIDTH;
    this.color = LASER_COLORS[level % 4];
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
