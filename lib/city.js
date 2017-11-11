const CITY_HEIGHT = 80;
export const CITY_WIDTH = 80;

class City {
  constructor(startPos) {
    this.width = CITY_WIDTH;
    this.height = CITY_HEIGHT;
    this.img = new Image();
    this.img.src = "./assets/city.png";
    this.startPos = startPos;
  }

  render(ctx) {

    ctx.drawImage(this.img, this.startPos[0], this.startPos[1]);
  }

  hitbox() {
    return [this.startPos,
       [this.startPos[0] + this.width, this.startPos[1] + this.height ]];
  }

}

export default City;
