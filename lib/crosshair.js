class CrossHair {
  constructor() {

    this.pos =  [0,0];
    this.width = 20;
    this.height = 20;
    this.img = new Image();
    this.img.src = "./assets/crosshair.png";

  }

  render(ctx) {

    // ctx.fillRect(this.pos[0] - (this.width/2) , this.pos[1] - (this.height/2), this.width, this.height);
    ctx.drawImage(this.img, this.pos[0] - (this.width/2) , this.pos[1] - (this.height/2), this.width, this.height);
  }

}

export default CrossHair;
