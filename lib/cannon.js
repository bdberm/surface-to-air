const CANNON_LENGTH = 20;
const CANNON_WIDTH = 5;

// const Cannon = (startPos, endPos, ctx) => {
// };

class Cannon {
  constructor(startPos) {
    this.width = CANNON_WIDTH;
    this.length = CANNON_LENGTH;
    this.startPos = startPos;

  }

  render(ctx, endPos) {


    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(endPos[0], endPos[1]);
    ctx.lineWidth = this.width;
    ctx.stroke();
    ctx.closePath();

  }

}

export default Cannon;
