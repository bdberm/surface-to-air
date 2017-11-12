import CrossHair from './crosshair';
import Cannon from './cannon';
import Laser from './laser';
import Bomb from './bomb';
import Explosion from './explosion';
import City from './city';
import {calcUnitVector, RandomStartPos, RandomEndPos} from './util';
import {checkBombLaserCollision, checkCityBombCollision} from './collisions';
import {CITY_WIDTH} from  './city';


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
    this.cities = [];
    this.render = this.render.bind(this);
    this.generateBombs();
    this.checkCollisions();
    this.explode = new Audio('./assets/explosion.wav');
    this.explode.volume = 0.2;
    this.bigExplode = new Audio('./assets/explosion.wav');
    this.bigExplode.volume = 0.6;
    this.scream = new Audio("./assets/scream.mp3");
    this.scream.volume = 0.6;
    this.paused = true;
    this.renderCannon();
    this.populateCities();
  }

  resetBoard() {

    this.lasers = [];
    this.bombs = [];
    this.lasers = [];
    this.explosions = [];
    this.cities = [];
    this.paused = true;
    this.populateCities();
  }

  populateCities() {
   const citiesPerSide = Math.floor(((this.width / 2) - 20) / CITY_WIDTH);

   for (let i = 0; i < citiesPerSide; i++) {
     this.cities.push(new City([5+i*CITY_WIDTH,424]));
   }

   for (let i = 1; i < citiesPerSide+1; i++) {
     this.cities.push(new City([this.width-5-i*CITY_WIDTH,424]));
   }
  }

  generateBombs() {


    window.setInterval(() => {
      if (!this.paused) {
        const newBomb = new Bomb(RandomStartPos(this.width), RandomEndPos(this.width,this.height));
        this.bombs.push(newBomb);
      }
    }, BOMB_INTERVAL);

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
      this.renderCollection(this.cities);
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

  checkCollisions() {
    window.setInterval(() => {
      if (!this.paused) {
        this.checkLaserBombCollisions();
        this.checkCityBombCollisions();
        this.checkGroundBombCollisions();
      }
    }, COLLISION_INTERVAL);
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

  checkCityBombCollisions() {
    const cities = this.cities;
    const bombs = this.bombs;

    cities.forEach((city) => {
      bombs.forEach((bomb) => {
        if(checkCityBombCollision(city, bomb)) {
          console.log("city");
          this.processCityBombCollision(city, bomb);
        }
      });
    });
  }

  checkGroundBombCollisions() {
    const bombs = this.bombs;

    bombs.forEach((bomb) => {
      if (bomb.startPos[1] + bomb.height > this.height) {
        this.processGroundBombCollision(bomb);
      }
    });
  }

  processGroundBombCollision(bomb) {
    const newExplosion = new Explosion(bomb.startPos, bomb.width);
    this.explosions.push(newExplosion);
    window.setTimeout(()=> {
      const explosionIdx = this.explosions.indexOf(newExplosion);
      delete this.explosions[explosionIdx];
    }, 700);

    const bombIdx = this.bombs.indexOf(bomb);
    this.bombs.splice(bombIdx,1);
    this.explode.play();
  }

  processLaserBombCollision(laser,bomb) {
    const newExplosion = new Explosion(bomb.startPos, bomb.width);
    this.explosions.push(newExplosion);
    window.setTimeout(()=> {
      const explosionIdx = this.explosions.indexOf(newExplosion);
      delete this.explosions[explosionIdx];
    }, 700);

    const laserIdx = this.lasers.indexOf(laser);
    const bombIdx = this.bombs.indexOf(bomb);
    this.lasers.splice(laserIdx,1);
    this.bombs.splice(bombIdx,1);
    this.explode.play();
  }

  processCityBombCollision(city, bomb) {
    const cityExplosion = new Explosion(city.startPos, city.width);
    this.explosions.push(cityExplosion);
    window.setTimeout(()=> {
      const explosionIdx = this.explosions.indexOf(cityExplosion);
      delete this.explosions[explosionIdx];
    }, 700);

    const bombExplosion = new Explosion(bomb.startPos, bomb.width);
    this.explosions.push(bombExplosion);
    window.setTimeout(()=> {
      const explosionIdx = this.explosions.indexOf(bombExplosion);
      delete this.explosions[explosionIdx];
    }, 700);

    const cityIdx = this.cities.indexOf(city);
    const bombIdx = this.bombs.indexOf(bomb);
    this.cities.splice(cityIdx,1);
    this.bombs.splice(bombIdx, 1);
    this.bigExplode.play();
    this.scream.play();
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
