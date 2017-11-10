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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
  [Math.random() * boardWidth ,boardHeight]
);
/* harmony export (immutable) */ __webpack_exports__["a"] = RandomEndPos;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collisions__ = __webpack_require__(7);



const gameWidth = 800;
const gameHeight = 500;
const windowWidth = Math.max(window.windowWidth, gameWidth);
const windowHeight = Math.max(window.windowHeight, gameHeight);


document.addEventListener("DOMContentLoaded",() => {
  window.Collisions = __WEBPACK_IMPORTED_MODULE_1__collisions__;
  const canvas = document.getElementById('canvas');
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  const gameBoard = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](canvas);
  const laserShot = new Audio("./assets/laser.wav");


  gameBoard.render();

  canvas.addEventListener("mousemove", (e) => {

    const coords = [e.offsetX, e.offsetY];
    gameBoard.crossHair.pos = coords;

  });

  canvas.addEventListener("click", (e) => {
    gameBoard.addLaser();
    laserShot.play();
  });

});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crosshair__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannon__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__laser__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bomb__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__collisions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__explosion__ = __webpack_require__(8);








const BOMB_INTERVAL = 1000;
const COLLISION_INTERVAL = 10;


class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.crossHair = new __WEBPACK_IMPORTED_MODULE_0__crosshair__["a" /* default */]();
    this.mainCannon = new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */]([canvas.width/2, canvas.height]);
    this.lasers = [];
    this.bombs = [];
    this.lasers = [];
    this.explosions = [];
    this.render = this.render.bind(this);
    this.generateBombs();
    this.checkCollisions();
    this.explode = new Audio('./assets/explosion.wav');
  }

  generateBombs() {


    window.setInterval(() => {
      const newBomb = new __WEBPACK_IMPORTED_MODULE_3__bomb__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* RandomStartPos */])(this.width), Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* RandomEndPos */])(this.width,this.height));
      this.bombs.push(newBomb);
    },BOMB_INTERVAL);

  }

  checkCollisions() {
    window.setInterval(() => {
      this.checkLaserBombCollisions();
    }, COLLISION_INTERVAL);
  }


  addLaser() {
    const newLaser = new __WEBPACK_IMPORTED_MODULE_2__laser__["a" /* default */](this.mainCannon.endPos, this.crossHair.pos);
    this.lasers.push(newLaser);
  }

  render() {

    this.ctx.clearRect(0,0, this.width, this.height);
    this.crossHair.render(this.ctx);
    this.renderCannon();
    this.renderCollection(this.lasers);
    this.renderCollection(this.bombs);
    this.renderCollection(this.explosions);



    window.requestAnimationFrame(() =>
    this.render(this.width, this.height));
  }

  renderCannon() {
    const cannonStart = this.mainCannon.startPos;
    const crossHairVector = Object(__WEBPACK_IMPORTED_MODULE_4__util__["d" /* calcUnitVector */])(cannonStart, this.crossHair.pos);
    this.mainCannon.calcEndPoint(crossHairVector);
    this.mainCannon.render(this.ctx);
  }

  checkLaserBombCollisions() {
    const lasers = this.lasers;
    const bombs = this.bombs;

    lasers.forEach((laser) => {
      bombs.forEach((bomb) => {
        if(Object(__WEBPACK_IMPORTED_MODULE_5__collisions__["checkBombLaserCollision"])(laser, bomb)) {
          this.processLaserBombCollision(laser, bomb);
        }
      });
    });
  }

  processLaserBombCollision(laser,bomb) {
    const newExplosion = new __WEBPACK_IMPORTED_MODULE_6__explosion__["a" /* default */](bomb.startPos);
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CrossHair {
  constructor() {

    this.pos =  [0,0];
    this.width = 20;
    this.height = 20;
    this.img = new Image();
    this.img.src = "./assets/crosshair.png";

  }

  render(ctx) {
    ctx.drawImage(this.img, this.pos[0] - (this.width/2) , this.pos[1] - (this.height/2), this.width, this.height);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (CrossHair);


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);


const LASER_LENGTH = 25;
const LASER_WIDTH = 3;
const LASER_COLOR = "#ff0101";
const LASER_VEL = 10;




class Laser {
  constructor(startPos, endVectorPos) {
    this.startPos = startPos;
    this.length = LASER_LENGTH;
    this.width = LASER_WIDTH;
    this.color = LASER_COLOR;
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);



const BOMB_HEIGHT = 50;
const BOMB_WIDTH = 50;
const BOMB_MAX_VEL = 2.5;
const BOMB_MIN_VEL = 1;
const COLLIDABLE_WIDTH_RATIO = .41;


class Bomb {
  constructor(startVectorPos, endVectorPos) {
    this.img = new Image();
    this.img.src = "./assets/bomb.png";
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
    const xAdjust = ((1 - COLLIDABLE_WIDTH_RATIO) * this.width)/2;


    const topLeft = [this.startPos[0] + xAdjust , this.startPos[1]];
    const bottomRight = [this.startPos[0] + this.width - xAdjust, this.startPos[1] + this.height];

    return [topLeft, bottomRight];

  }





}

/* harmony default export */ __webpack_exports__["a"] = (Bomb);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const checkBombLaserCollision = (laser, bomb) => {


  const startInHitbox = checkPosInHitbox(laser.startPos, bomb.hitbox());
  const endInHitbox = checkPosInHitbox(laser.endPos, bomb.hitbox());

  return (startInHitbox || endInHitbox);

};
/* harmony export (immutable) */ __webpack_exports__["checkBombLaserCollision"] = checkBombLaserCollision;


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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
      if (this.frame > 36) {

        window.clearInterval(explode);
      }
    },20);


  }
}

/* harmony default export */ __webpack_exports__["a"] = (Explosion);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map