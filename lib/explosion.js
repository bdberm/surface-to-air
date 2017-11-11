// const EXPLOSION_WIDTH = 50;
// const EXPLOSION_HEIGHT = 50;

class Explosion {
  constructor(pos, width) {
    this.pos = pos;
    this.width = width;
    this.height = width;
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
      if (this.frame > 36) {

        window.clearInterval(explode);
      }
    },20);


  }
}

export default Explosion;
