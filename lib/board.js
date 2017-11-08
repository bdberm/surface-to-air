import CrossHair from './crosshair';

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.crosshair = new CrossHair();
    this.crosshair.render = this.crosshair.render.bind(this);
  }

  render() {
    this.crosshair.render();
  }
}

export default Board;
