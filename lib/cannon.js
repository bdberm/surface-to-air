const CANNON_LENGTH = 40;
const CANNON_WIDTH = 15;
const CANNON_COLOR = "#43464B";

// const Cannon = (startPos, endPos, ctx) => {
// };

class Cannon {
  constructor(startPos) {
    this.width = CANNON_WIDTH;
    this.length = CANNON_LENGTH;
    this.color = CANNON_COLOR;
    this.startPos = startPos;

  }

  render(ctx, endPos) {

    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(endPos[0], endPos[1]);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();


    ctx.fillRect(this.startPos[0]-20, this.startPos[1]-10, 40, 10);



  }

}

export default Cannon;
