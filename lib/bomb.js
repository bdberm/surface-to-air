import {calcUnitVector, calcPosDistAway} from './util';


const BOMB_HEIGHT = 50;
const BOMB_WIDTH = 50;
const BOMB_MAX_VEL = 2.5;
const BOMB_MIN_VEL = 1;

const BOMB_IMAGES = {
  1: "./assets/bomb.png",
  2: "./assets/alien.png",
  3: "./assets/mushroom.png",
  0: "./assets/spider.png"
};

const HITBOX_RATIOS = {
  1: [.41, 1],
  2: [.70, .59],
  3: [.65, .66],
  0: [.92, .54]
};


class Bomb {
  constructor(startVectorPos, endVectorPos, level) {
    this.img = new Image();
    this.img.src = BOMB_IMAGES[level % 4];
    this.hitboxRatio = HITBOX_RATIOS[level % 4];
    this.width = BOMB_WIDTH;
    this.height = BOMB_HEIGHT;
    this.vel =(Math.random() * (BOMB_MAX_VEL - BOMB_MIN_VEL)) + BOMB_MIN_VEL;
    this.unitVector = calcUnitVector(startVectorPos, endVectorPos);
    this.startPos = calcPosDistAway(startVectorPos, this.unitVector, this.height * -1);
  }

  render(ctx) {
    // debugger
    ctx.drawImage(this.img, this.startPos[0], this.startPos[1], this.width, this.height);
  }

  move() {
    this.startPos = calcPosDistAway(this.startPos, this.unitVector, this.vel);
  }

  hitbox() {
    const xAdjust = ((1 - this.hitboxRatio[0]) * this.width)/2;
    const yAdjust = ((1 - this.hitboxRatio[1]) * this.height)/2;

    const topLeft = [this.startPos[0] + xAdjust , this.startPos[1] + yAdjust];
    const bottomRight = [this.startPos[0] + this.width - xAdjust, this.startPos[1] + this.height - yAdjust];

    return [topLeft, bottomRight];

  }





}

export default Bomb;
