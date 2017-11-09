import CrossHair from './crosshair';
import Cannon from './cannon';
import {calcPointBetween} from './util';

class Board {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.crossHair = new CrossHair();
    this.mainCannon = new Cannon([canvas.width/2, canvas.height]);
    this.render = this.render.bind(this);
  }

  render() {


    this.ctx.clearRect(0,0, this.gameWidth, this.gameHeight);



    this.crossHair.render(this.ctx);

    const cannonEndPos = calcPointBetween(this.crossHair.pos,
      this.mainCannon.startPos,
      this.mainCannon.length);

    this.mainCannon.render(this.ctx, cannonEndPos);


    window.requestAnimationFrame(() => this.render(this.gameWidth, this.gameHeight));
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
