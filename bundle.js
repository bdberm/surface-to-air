/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const calcDist = (startPos, endPos) => {

  const dist = Math.sqrt(
    Math.pow((endPos[0] - startPos[0]),2) +
    Math.pow((endPos[1] - startPos[1]),2)
  );
  return dist;
};
/* unused harmony export calcDist */



const calcUnitVector = (startPos, endPos) => {
  const vector = [(endPos[0] - startPos[0]), (endPos[1] - startPos[1])];
  const dist = calcDist(startPos, endPos);

  return [vector[0] / dist, vector[1] / dist];
};
/* harmony export (immutable) */ __webpack_exports__["d"] = calcUnitVector;


const calcPosDistAway = (startPos, unitVector, dist) => {
  return [
    startPos[0] + (dist * unitVector[0]),
    startPos[1] + (dist * unitVector[1])
  ];
};
/* harmony export (immutable) */ __webpack_exports__["c"] = calcPosDistAway;


const RandomStartPos = (boardWidth) => (
  [Math.random() * boardWidth , 0]
);
/* harmony export (immutable) */ __webpack_exports__["b"] = RandomStartPos;


const RandomEndPos = (boardWidth, boardHeight) => (
  [Math.random() * (boardWidth + 200) - 100 ,boardHeight]
);
/* harmony export (immutable) */ __webpack_exports__["a"] = RandomEndPos;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crosshair__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannon__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__laser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bomb__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__explosion__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__city__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__collisions__ = __webpack_require__(9);











const BOMB_INTERVAL_START = 1000;
const COLLISION_INTERVAL = 10;



class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.crossHair = new __WEBPACK_IMPORTED_MODULE_0__crosshair__["a" /* default */](this.width, this.height);
    this.mainCannon = new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */]([canvas.width/2, canvas.height]);
    this.lasers = [];
    this.bombs = [];
    this.lasers = [];
    this.explosions = [];
    this.cities = [];
    this.render = this.render.bind(this);
    this.bombInterval = BOMB_INTERVAL_START;
    this.generateBombs();
    this.checkCollisions();
    this.explode = new Audio('./assets/explosion.wav');
    this.explode.volume = 0.2;
    this.bigExplode = new Audio('./assets/explosion.wav');
    this.bigExplode.volume = 0.6;
    this.scream = new Audio("./assets/scream.mp3");
    this.scream.volume = 0.6;
    this.paused = true;
    this.level = 1;
    this.populateCities();
    this.renderCannon();
  }

  gameOver() {
    return this.cities.length === 0;
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
   const citiesPerSide = Math.floor(((this.width / 2) - 20) / __WEBPACK_IMPORTED_MODULE_5__city__["a" /* CITY_WIDTH */]);

   for (let i = 0; i < citiesPerSide; i++) {
     this.cities.push(new __WEBPACK_IMPORTED_MODULE_5__city__["b" /* default */]([5+i*__WEBPACK_IMPORTED_MODULE_5__city__["a" /* CITY_WIDTH */],424]));
   }

   for (let i = 1; i < citiesPerSide+1; i++) {
     this.cities.push(new __WEBPACK_IMPORTED_MODULE_5__city__["b" /* default */]([this.width-5-i*__WEBPACK_IMPORTED_MODULE_5__city__["a" /* CITY_WIDTH */],424]));
   }
  }

  generateBombs() {


    window.setInterval(() => {
      if (!this.paused) {
        const newBomb = new __WEBPACK_IMPORTED_MODULE_3__bomb__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* RandomStartPos */])(this.width), Object(__WEBPACK_IMPORTED_MODULE_6__util__["a" /* RandomEndPos */])(this.width,this.height), this.level);
        this.bombs.push(newBomb);
      }
    }, this.bombInterval);

  }




  addLaser() {
    const newLaser = new __WEBPACK_IMPORTED_MODULE_2__laser__["a" /* default */](this.mainCannon.endPos, this.crossHair.pos, this.level);
    this.lasers.push(newLaser);
  }

  render() {
    if (!this.paused) {
      this.ctx.clearRect(0,0, this.width, this.height);

      this.renderCannon();
      this.renderCollection(this.bombs);
      this.renderCollection(this.explosions);
      this.renderCollection(this.cities);
      this.crossHair.render(this.ctx);
      this.renderCollection(this.lasers);
    }

    window.requestAnimationFrame(() =>
    this.render(this.width, this.height));
  }

  renderCannon() {
    const cannonStart = this.mainCannon.startPos;
    const crossHairVector = Object(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* calcUnitVector */])(cannonStart, this.crossHair.pos);
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
        if(Object(__WEBPACK_IMPORTED_MODULE_7__collisions__["a" /* checkBombLaserCollision */])(laser, bomb)) {
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
        if(Object(__WEBPACK_IMPORTED_MODULE_7__collisions__["b" /* checkCityBombCollision */])(city, bomb)) {
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
    const newExplosion = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */](bomb.startPos, bomb.width);
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
    const newExplosion = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */](bomb.startPos, bomb.width);
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
    const cityExplosion = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */](city.startPos, city.width);
    this.explosions.push(cityExplosion);
    window.setTimeout(()=> {
      const explosionIdx = this.explosions.indexOf(cityExplosion);
      delete this.explosions[explosionIdx];
    }, 700);

    const bombExplosion = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */](bomb.startPos, bomb.width);
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
      if (item instanceof __WEBPACK_IMPORTED_MODULE_3__bomb__["a" /* default */] || item instanceof __WEBPACK_IMPORTED_MODULE_2__laser__["a" /* default */]) {
        item.move();
      }
      item.render(this.ctx);
    });
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CITY_HEIGHT = 80;
const CITY_WIDTH = 80;
/* harmony export (immutable) */ __webpack_exports__["a"] = CITY_WIDTH;


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

/* harmony default export */ __webpack_exports__["b"] = (City);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(10);



const gameWidth = 800;
const gameHeight = 500;
const windowWidth = Math.max(window.windowWidth, gameWidth);
const windowHeight = Math.max(window.windowHeight, gameHeight);


document.addEventListener("DOMContentLoaded",() => {
  const canvas = document.getElementById('canvas');
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  const gameBoard = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](canvas);
  const game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */](gameBoard, canvas);
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (CrossHair);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);


const CANNON_LENGTH = 50;
const CANNON_WIDTH = 15;
const CANNON_COLOR = "#43464B";



class Cannon {
  constructor(startPos) {
    this.width = CANNON_WIDTH;
    this.length = CANNON_LENGTH;
    this.color = CANNON_COLOR;
    this.startPos = startPos;
    this.endPos = [startPos[0], startPos[1] - this.length];

  }

  render(ctx) {

    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();


    ctx.fillRect(this.startPos[0]-20, this.startPos[1]-10, 40, 10);

  }

  calcEndPoint(unitVector) {
    this.endPos = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* calcPosDistAway */])(this.startPos, unitVector, this.length);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);


const LASER_LENGTH = 25;
const LASER_WIDTH = 3;
const LASER_COLOR = "#ff0101";
const LASER_VEL = 10;

const LASER_COLORS = {
  1: "#ff0101",
  2: "#49fb35",
  3: "#ccff15",
  0: "#c32aff"
};

class Laser {
  constructor(startPos, endVectorPos, level) {
    this.startPos = startPos;
    this.length = LASER_LENGTH;
    this.width = LASER_WIDTH;
    this.color = LASER_COLORS[level % 4];
    this.vel = LASER_VEL;
    this.unitVector = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* calcUnitVector */])(startPos, endVectorPos);
    this.endPos = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* calcPosDistAway */])(startPos, this.unitVector, this.length);
  }

  render(ctx) {

    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.endPos[0], this.endPos[1]);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  move() {
    this.startPos = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* calcPosDistAway */])(this.startPos, this.unitVector, this.vel);
    this.endPos = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* calcPosDistAway */])(this.endPos, this.unitVector, this.vel);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Laser);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);



const BOMB_HEIGHT = 50;
const BOMB_WIDTH = 50;
const BOMB_MAX_VEL = 2.5;
const BOMB_MIN_VEL = 1;

const BOMB_IMAGES = {
  1: "./assets/bomb.png",
  2: "./assets/alien.png",
  3: "./assets/mushroom.png",
  0: "./assets/spider.png"
};

const HITBOX_RATIOS = {
  1: [.41, 1],
  2: [.70, .59],
  3: [.65, .66],
  0: [.92, .54]
};


class Bomb {
  constructor(startVectorPos, endVectorPos, level) {
    this.img = new Image();
    this.img.src = BOMB_IMAGES[level % 4];
    this.hitboxRatio = HITBOX_RATIOS[level % 4];
    this.width = BOMB_WIDTH;
    this.height = BOMB_HEIGHT;
    this.vel =(Math.random() * (BOMB_MAX_VEL - BOMB_MIN_VEL)) + BOMB_MIN_VEL;
    this.unitVector = Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* calcUnitVector */])(startVectorPos, endVectorPos);
    this.startPos = Object(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* calcPosDistAway */])(startVectorPos, this.unitVector, this.height * -1);
  }

  render(ctx) {
    // debugger
    ctx.drawImage(this.img, this.startPos[0], this.startPos[1], this.width, this.height);
  }

  move() {
    this.startPos = Object(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* calcPosDistAway */])(this.startPos, this.unitVector, this.vel);
  }

  hitbox() {
    const xAdjust = ((1 - this.hitboxRatio[0]) * this.width)/2;
    const yAdjust = ((1 - this.hitboxRatio[1]) * this.height)/2;

    const topLeft = [this.startPos[0] + xAdjust , this.startPos[1] + yAdjust];
    const bottomRight = [this.startPos[0] + this.width - xAdjust, this.startPos[1] + this.height - yAdjust];

    return [topLeft, bottomRight];

  }





}

/* harmony default export */ __webpack_exports__["a"] = (Bomb);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Explosion);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const checkBombLaserCollision = (laser, bomb) => {


  const startInHitbox = checkPosInHitbox(laser.startPos, bomb.hitbox());
  const endInHitbox = checkPosInHitbox(laser.endPos, bomb.hitbox());

  return (startInHitbox || endInHitbox);

};
/* harmony export (immutable) */ __webpack_exports__["a"] = checkBombLaserCollision;


const checkCityBombCollision = (city, bomb) => {
  const bombHitbox = bomb.hitbox();
  const bombTopLeft = bombHitbox[0];
  const bombBottomRight = bombHitbox[1];
  const bombTopRight = [bombBottomRight[0], bombTopLeft[1]];
  const bombBottomLeft = [bombTopLeft[0],bombBottomRight[1]];

  const topLeftInHitbox = checkPosInHitbox(bombTopLeft, city.hitbox());
  const bottomRightInHitBox = checkPosInHitbox(bombBottomRight, city.hitbox());
  const topRightInHitbox = checkPosInHitbox(bombTopRight, city.hitbox());
  const bottomLeftInHitbox = checkPosInHitbox(bombBottomLeft, city.hitbox());

  return (topLeftInHitbox || bottomRightInHitBox || topRightInHitbox || bottomLeftInHitbox);

};
/* harmony export (immutable) */ __webpack_exports__["b"] = checkCityBombCollision;


const checkPosInHitbox = (pos, hitbox) => {
  const topLeft = hitbox[0];
  const bottomRight = hitbox[1];
  const x = pos[0];
  const y = pos[1];
  let inBox = false;

  if (x >= topLeft[0] && x <= bottomRight[0]
    && y >= topLeft[1] && y <= bottomRight[1]) {
      inBox = true;
  }

  return inBox;
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer__ = __webpack_require__(11);



const CANNON_DELAY = 300;
const ROUND_TIME = 60;
const KEYBOARD_CROSSHAIR_VEL = 12.5;

const BACKGROUNDS = {
  1: "./assets/mountains.jpg",
  2: "./assets/moonscape.jpg",
  3: "./assets/mushroom_forest.jpg",
  0: "./assets/desert.png",
};

class Game {
  constructor(board, canvas) {
    this.board = board;
    this.canvas = canvas;
    this.canvas.style.backgroundImage = `url(${BACKGROUNDS[1]})`;
    this.playPause = document.getElementById('play-pause');
    this.timeDisplay = document.getElementById('timer');
    this.citiesRemaining = document.getElementById('cities-remaining');
    this.reset = document.getElementById('reset');
    this.gameOverModal = document.getElementById('game-over');
    this.pauseModal = document.getElementById('pause');
    this.startModal = document.getElementById("start");
    this.levelModal = document.getElementById('level-up');
    this.laserShot = new Audio("./assets/laser.wav");
    this.laserShot.volume = 0.2;
    this.backgroundMusic = new Audio("./assets/background.mp3");
    this.backgroundMusic.loop = true;
    this.muteButton = document.getElementById('mute-button');
    this.muted = false;
    this.display = this.display.bind(this);
    this.canShoot = true;
    this.timer = new __WEBPACK_IMPORTED_MODULE_1__timer__["a" /* default */](ROUND_TIME);
    this.level = 1;
    this.setUp();
    this.arrowsDown = [false, false, false, false];
    this.crossHairVec = [0,0];
  }

  resetGame() {
    this.timer.seconds = ROUND_TIME;
    this.backgroundMusic.pause();
    this.level = 1;
    this.board.level = 1;
    this.canvas.style.backgroundImage = `url(${BACKGROUNDS[1]})`;
    this.board.resetBoard();
  }

  levelUp() {
    this.level += 1;
    this.canvas.style.backgroundImage = `url(${BACKGROUNDS[this.level % 4]})`;
    this.board.level  = this.level;
    if (this.board.bombInterval > 200) {
      this.board.bombInterval -= 50;
    }

    this.timer.seconds = ROUND_TIME;
    this.board.resetBoard();
    this.backgroundMusic.pause();
    this.levelModal.className = "pop-up visible";

  }

  setUp() {
    this.display();
    this.board.render();
    this.playPause.textContent = "Play";

    this.canvas.addEventListener("mousemove", (e) => {

      const coords = [e.offsetX, e.offsetY];
      this.board.crossHair.pos = coords;

    });

    this.canvas.addEventListener("click", (e) => {
      this.handleLaserShot();
    });

    window.addEventListener("keypress", (e) => {
      switch (e.key) {
        case "p":
          this.handlePlayPause();
          break;
        case "r":
          this.resetGame();
          break;
        case "x":

          if (this.gameOverModal.className === "pop-up visible") {
            this.gameOverModal.className = "pop-up";
            this.handlePlayPause();
          }
          if (this.levelModal.className === "pop-up visible") {
            this.levelModal.className = "pop-up";
            this.handlePlayPause();
          }
          break;
        case "m":
          this.muteUnmute();
          break;
        case " ":
          e.preventDefault();
          this.handleLaserShot();
          break;
      }
    });

    window.addEventListener("keydown", (e) => {

      switch (e.key) {
        case "ArrowLeft":
          this.handleArrowDown("left");
          this.arrowsDown[0] = true;
          break;
        case "ArrowRight":
          this.handleArrowDown("right");
          this.arrowsDown[1] = true;
          break;
        case "ArrowUp":
          e.preventDefault();
          this.handleArrowDown("up");
          this.arrowsDown[2] = true;
          break;
        case "ArrowDown":
          e.preventDefault();
          this.handleArrowDown("down");
          this.arrowsDown[3] = true;
          break;
      }
    });

    window.setInterval(() => {
      this.adjustCrossHairVec();
    }, 50);

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.handleArrowUp("left");
          this.arrowsDown[0] = false;
          break;
        case "ArrowRight":
          this.handleArrowUp("right");
          this.arrowsDown[1] = false;
          break;
        case "ArrowUp":
          e.preventDefault();
          this.handleArrowUp("up");
          this.arrowsDown[2] = false;
          break;
        case "ArrowDown":
          e.preventDefault();
          this.handleArrowUp("down");
          this.arrowsDown[3] = false;
          break;
      }
    });

    this.playPause.addEventListener("mousedown", (e) => {
      this.handlePlayPause();
    });

    window.setInterval(() => {
      if (!this.board.paused) {
        this.timer.seconds -= 1;
      }
    }, 1000);

    this.reset.addEventListener("click", (e) => {
      this.resetGame();
    });

    this.muteButton.addEventListener("click", (e) => {
      this.muteUnmute();
    });

    window.addEventListener('blur', (e) => {
      this.board.paused = false;
      this.handlePlayPause();
    });

  }

  muteUnmute() {
    this.muted = this.muted ? false : true;
    if (!this.muted && !this.board.paused) {
      this.backgroundMusic.play();
    }
    if (this.muted) {
      this.backgroundMusic.pause();
      this.muteButton.style.backgroundImage = "url(./assets/mute.png)";
    } else {
      this.muteButton.style.backgroundImage = "url(./assets/sound_on.png)";
    }
    this.muteButton.blur();
  }

  adjustCrossHairVec() {
    const [left, right, up, down] = this.arrowsDown;
    const xAdj = (up || down) ? 0.5 : 1;
    const yAdj = (left || right) ? 0.5 : 1;
    this.board.crossHair.vector =  [this.crossHairVec[0] * xAdj, this.crossHairVec[1] * yAdj];
  }

  handleArrowDown(dir) {

    const [crossHairIdx, otherIdx, arrowDown, plusMinus] = this.arrowHelper(dir);

    if (!arrowDown) {
      this.crossHairVec[crossHairIdx] += KEYBOARD_CROSSHAIR_VEL * plusMinus;
    }
  }

  handleArrowUp(dir) {
    const [crossHairIdx, otherIdx, arrowDown, plusMinus] = this.arrowHelper(dir);
    if (this.crossHairVec[crossHairIdx] !== 0) {
      this.crossHairVec[crossHairIdx] += KEYBOARD_CROSSHAIR_VEL * plusMinus * -1;
    }
  }

  arrowHelper(dir) {
    let crossHairIdx;
    let otherIdx;
    let arrowDown;
    let plusMinus;
    switch (dir) {
      case "left":
        [crossHairIdx, otherIdx, arrowDown, plusMinus] = [0,1,this.arrowsDown[0],-1];
        break;
      case "right":
        [crossHairIdx, otherIdx, arrowDown, plusMinus] = [0,1,this.arrowsDown[1],1];
        break;
      case "up":
        [crossHairIdx, otherIdx, arrowDown, plusMinus] = [1,0,this.arrowsDown[2],-1];
        break;
      case "down":
        [crossHairIdx, otherIdx, arrowDown, plusMinus] = [1,0,this.arrowsDown[3],1];
        break;
    }

    return [crossHairIdx, otherIdx, arrowDown, plusMinus];
  }



  handlePlayPause() {
    this.board.paused = this.board.paused ? false : true;
    if (this.board.paused) {
      this.backgroundMusic.pause();
      if(!this.board.gameOver()) {
        this.pauseModal.className = "pop-up visible";
      }
    } else {
      if (!this.muted) {
        this.backgroundMusic.play();
      }
      this.startModal.className = "pop-up";
      this.pauseModal.className = "pop-up";
      this.canvas.focus();
    }
  }

  handleLaserShot() {
    if (this.canShoot && !this.board.paused) {
      this.board.addLaser();
      this.laserShot.play();
      this.canShoot = false;
      window.setTimeout(() => {this.canShoot = true;}, CANNON_DELAY);
    }
  }


  display() {
    if (this.board.gameOver()) {
      this.gameOverModal.className = "pop-up visible";
      this.resetGame();
    }

    if (this.timer.seconds === 0) {
      this.levelUp();
    }
    this.playPause.textContent = this.board.paused ? "Play" : "Pause";
    this.timeDisplay.textContent = this.timer.display();
    this.citiesRemaining.textContent = `Level ${this.level}: ${this.board.cities.length} cities remain`;
    window.requestAnimationFrame(this.display);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer {
  constructor(seconds) {
    this.seconds = seconds;
  }

  display() {
    const minutes = Math.floor(this.seconds / 60);
    const displaySeconds = this.seconds % 60;

    const minuteStr = minutes.toString();
    const secondStr = displaySeconds < 10 ? "0" + displaySeconds.toString()
      : displaySeconds.toString();

    return `${minuteStr}:${secondStr}`;
    }



}

/* harmony default export */ __webpack_exports__["a"] = (Timer);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map