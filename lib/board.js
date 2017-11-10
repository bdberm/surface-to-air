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
    this.explosion = new Explosion([100,100]);
    this.render = this.render.bind(this);
    this.generateBombs();
    this.checkCollisions();
    this.explode = new Audio('./assets/explosion.wav');
  }

  generateBombs() {


    window.setInterval(() => {
      const newBomb = new Bomb(RandomStartPos(this.width), RandomEndPos(this.width,this.height));
      this.bombs.push(newBomb);
    },BOMB_INTERVAL);

  }

  checkCollisions() {
    window.setInterval(() => {
      this.checkLaserBombCollisions();
    }, COLLISION_INTERVAL);
  }


  addLaser() {
    const newLaser = new Laser(this.mainCannon.endPos, this.crossHair.pos);
    this.lasers.push(newLaser);
  }

  render() {

    this.ctx.clearRect(0,0, this.width, this.height);
    this.explosion.render(this.ctx);
    this.crossHair.render(this.ctx);
    this.renderCannon();
    this.renderCollection(this.lasers);
    this.renderCollection(this.bombs);



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
    console.log("boom");
    const laserIdx = this.lasers.indexOf(laser);
    const bombIdx = this.bombs.indexOf(bomb);
    delete this.lasers[laserIdx];
    delete this.bombs[bombIdx];
    this.explode.play();

  }


  renderCollection(array) {
    array.forEach((item) => {
      item.move();
      item.render(this.ctx);
    });
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



export default Board;
