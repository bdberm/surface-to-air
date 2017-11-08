class CrossHair {
  constructor(ctx) {

    this.X = 0;
    this.Y =0;
    this.width = 10;
    this.height = 10;

  }

  render(ctx) {
    
    ctx.fillRect(this.X, this.Y, this.width, this.height);
  }

}

export default CrossHair;
