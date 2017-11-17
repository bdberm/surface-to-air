class CrossHair {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.pos =  [gameWidth/2,gameHeight/2];
    this.vector = [0,0];
    this.width = 20;
    this.height = 20;
    this.img = new Image();
    this.img.src = "./assets/crosshair.png";
    this.arrowsDown = [false, false, false, false];
  }

  render(ctx) {
    this.move();
    ctx.drawImage(this.img, this.pos[0] - (this.width/2) , this.pos[1] - (this.height/2), this.width, this.height);
  }

  move() {
    if (this.pos[0] < 0) {
      this.pos[0] = 0;
      this.vector[0] = 0;
    } else if (this.pos[0] > this.gameWidth) {
      this.pos[0] = this.gameWidth;
      this.vector[0] = 0;
    } else {
      this.pos[0] += this.vector[0];
    }

    if (this.pos[1] < 0) {
      this.pos[1] = 0;
      this.vector[1] = 0;
    } else if (this.pos[1] > this.gameHeight) {
      this.pos[1] = this.gameHeight;
      this.vector[1] = 0;
    } else {
      this.pos[1] += this.vector[1];
    }


  }

}

export default CrossHair;
