import CrossHair from './crosshair';

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.crossHair = new CrossHair();
    this.render = this.render.bind(this);
  }

  render(gameWidth, gameHeight) {


    this.ctx.clearRect(0,0,gameWidth, gameHeight);

    // this.ctx.fillStyle = Board.BACKGROUND_COLOR;
    // this.ctx.fillRect(0,0,gameWidth, gameHeight);

    this.crossHair.render(this.ctx);

    window.requestAnimationFrame(() => this.render(gameWidth, gameHeight));
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
