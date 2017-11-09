class CrossHair {
  constructor() {

    this.pos =  [0,0];
    this.width = 10;
    this.height = 10;

  }

  render(ctx) {

    ctx.fillRect(this.pos[0] - (this.width/2) , this.pos[1] - (this.height/2), this.width, this.height);
  }

}

export default CrossHair;
