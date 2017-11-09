const LASER_LENGTH = 15;
const LASER_WIDTH = 5;
const LASER_COLOR = "#49fb35";
const LASER_VEL = 3;



class Laser {
  constructor(startPos, endPos) {
    this.startPos = startPos;
    this.endPos = endPos;
    this.length = LASER_LENGTH;
    this.width = LASER_WIDTH;
    this.color = LASER_COLOR;
    this.vector = [endPos[0] - startPos[0],
      endPos[1] - endPos[0]];


  }



  move() {


  }
}
