const EXPLOSION_WIDTH = 50;
const EXPLOSION_HEIGHT = 50;

class Explosion {
  constructor(pos) {
    this.pos = pos;
    this.width = EXPLOSION_WIDTH;
    this.height = EXPLOSION_HEIGHT;
    this.img = new Image();
    this.img.src = "./assets/explosion_sprite.png";
    this.frame = 0;
    this.animate();
  }

  render(ctx) {

    const row = Math.floor(this.frame/4);
    const col = this.frame % 4;
    const xSpriteOffset = col * 128;
    const ySpriteOffset = row * 128;
    ctx.drawImage(this.img, xSpriteOffset, ySpriteOffset, 128, 128, this.pos[0], this.pos[1], this.width, this.height);
  }

  animate() {
    let explode = window.setInterval(() => {
      this.frame += 1;
    },50);

    if (this.frame > 35) {
      window.clearInterval(explode);
    }
  }
}

export default Explosion;
