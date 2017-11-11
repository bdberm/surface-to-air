import CrossHair from './crosshair';
import Cannon from './cannon';
import Laser from './laser';
import Bomb from './bomb';
import {calcUnitVector, RandomStartPos, RandomEndPos} from './util';
import {checkBombLaserCollision} from './collisions';
import Explosion from './explosion';

const BOMB_INTERVAL = 1000;
const COLLISION_INTERVAL = 10;


class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.crossHair = new CrossHair();
    this.mainCannon = new Cannon([canvas.width/2, canvas.height]);
    this.lasers = [];
    this.bombs = [];
    this.lasers = [];
    this.explosions = [];
    this.render = this.render.bind(this);
    this.generateBombs();
    this.checkCollisions();
    this.explode = new Audio('./assets/explosion.wav');
    this.explode.volume = 0.2;
    this.paused = true;
    this.renderCannon();
  }

  generateBombs() {


    window.setInterval(() => {
      if (!this.paused) {
        const newBomb = new Bomb(RandomStartPos(this.width), RandomEndPos(this.width,this.height));
        this.bombs.push(newBomb);
      }
    }, BOMB_INTERVAL);

  }

  checkCollisions() {
    window.setInterval(() => {
      if (!this.paused) {
        this.checkLaserBombCollisions();
      }
    }, COLLISION_INTERVAL);
  }


  addLaser() {
    const newLaser = new Laser(this.mainCannon.endPos, this.crossHair.pos);
    this.lasers.push(newLaser);
  }

  render() {
    if (!this.paused) {
      this.ctx.clearRect(0,0, this.width, this.height);
      this.crossHair.render(this.ctx);
      this.renderCannon();
      this.renderCollection(this.lasers);
      this.renderCollection(this.bombs);
      this.renderCollection(this.explosions);
    }

    window.requestAnimationFrame(() =>
    this.render(this.width, this.height));
  }

  renderCannon() {
    const cannonStart = this.mainCannon.startPos;
    const crossHairVector = calcUnitVector(cannonStart, this.crossHair.pos);
    this.mainCannon.calcEndPoint(crossHairVector);
    this.mainCannon.render(this.ctx);
  }

  checkLaserBombCollisions() {
    const lasers = this.lasers;
    const bombs = this.bombs;

    lasers.forEach((laser) => {
      bombs.forEach((bomb) => {
        if(checkBombLaserCollision(laser, bomb)) {
          this.processLaserBombCollision(laser, bomb);
        }
      });
    });
  }

  processLaserBombCollision(laser,bomb) {
    const newExplosion = new Explosion(bomb.startPos);
    this.explosions.push(newExplosion);
    window.setTimeout(()=> {
      const explosionIdx = this.explosions.indexOf(newExplosion);
      delete this.explosions[explosionIdx];
    }, 700);

    const laserIdx = this.lasers.indexOf(laser);
    const bombIdx = this.bombs.indexOf(bomb);
    delete this.lasers[laserIdx];
    delete this.bombs[bombIdx];
    this.explode.play();


  }



  renderCollection(array) {
    array.forEach((item) => {
      if (item instanceof Bomb || item instanceof Laser) {
        item.move();
      }
      item.render(this.ctx);
    });
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
