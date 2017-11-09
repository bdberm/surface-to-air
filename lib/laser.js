const LASER_LENGTH = 15;
const LASER_WIDTH = 5;
const LASER_COLOR = "#49fb35";

class Laser {
  constructor(startPos, endPos) {
    this.startPos = startPos;
    this.endPos = endPos;
    this.color = LASER_COLOR;
  }
}
