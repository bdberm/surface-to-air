import CrossHair from './crosshair';
import Cannon from './cannon';

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

    // this.ctx.fillStyle = Board.BACKGROUND_COLOR;
    // this.ctx.fillRect(0,0,gameWidth, gameHeight);

    this.crossHair.render(this.ctx);
    this.mainCannon.render(this.ctx, this.crossHair.pos);


    window.requestAnimationFrame(() => this.render(this.gameWidth, this.gameHeight));
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
