import {calcUnitVector, calcPosDistAway} from './util.js';


const BOMB_HEIGHT = 50;
const BOMB_WIDTH = 50;
const BOMB_MAX_VEL = 2.5;
const BOMB_MIN_VEL = 1;
const COLLIDABLE_WIDTH_RATIO = .37;


class Bomb {
  constructor(startVectorPos, endVectorPos) {
    this.img = new Image();
    this.img.src = "./assets/bomb.png";
    this.width = BOMB_WIDTH;
    this.height = BOMB_HEIGHT;
    this.vel =(Math.random() * (BOMB_MAX_VEL - BOMB_MIN_VEL)) + BOMB_MIN_VEL;
    this.endPos = startVectorPos;
    this.unitVector = calcUnitVector(startVectorPos, endVectorPos);
    this.endPos = startVectorPos;
    this.startPos = calcPosDistAway(this.endPos, this.unitVector, this.height * -1);

  }

  render(ctx) {
    // debugger
    ctx.drawImage(this.img, this.startPos[0] - (this.width/2) , this.startPos[1] - (this.height/2), this.width, this.height);
  }

  move() {
    this.startPos = calcPosDistAway(this.startPos, this.unitVector, this.vel);
    this.endPos = calcPosDistAway(this.endPos, this.unitVector, this.vel);
  }





}

export default Bomb;
