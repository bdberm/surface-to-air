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






const INTERVAL = 1500;

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
    // this.bomb = new Bomb(RandomStartPos(this.width), RandomEndPos(this.width,this.height));
    this.render = this.render.bind(this);
    this.generateBombs();
  }

  generateBombs() {

    window.setInterval(() => {
      const newBomb = new __WEBPACK_IMPORTED_MODULE_3__bomb__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* RandomStartPos */])(this.width), Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* RandomEndPos */])(this.width,this.height));
      this.bombs.push(newBomb);
    },INTERVAL);

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



    window.requestAnimationFrame(() =>
    this.render(this.width, this.height));
  }

  renderCannon() {
    const cannonStart = this.mainCannon.startPos;
    const crossHairVector = Object(__WEBPACK_IMPORTED_MODULE_4__util__["d" /* calcUnitVector */])(cannonStart, this.crossHair.pos);
    this.mainCannon.calcEndPoint(crossHairVector);
    this.mainCannon.render(this.ctx);
  }



  renderCollection(array) {
    array.forEach((item) => {
      item.move();
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


const LASER_LENGTH = 30;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collisions__ = __webpack_require__(7);




const BOMB_HEIGHT = 50;
const BOMB_WIDTH = 50;
const BOMB_MAX_VEL = 2.5;
const BOMB_MIN_VEL = 1;
const COLLIDABLE_WIDTH_RATIO = .37;


class Bomb {
  constructor(startVectorPos, endVectorPos) {
    this.img = new Image();
    this.img.src = "./assets/bomb.png";
    this.width = BOMB_WIDTH;
    this.height = BOMB_HEIGHT;
    this.vel =(Math.random() * (BOMB_MAX_VEL - BOMB_MIN_VEL)) + BOMB_MIN_VEL;
    this.endPos = startVectorPos;
    this.unitVector = Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* calcUnitVector */])(startVectorPos, endVectorPos);
    this.endPos = startVectorPos;
    this.startPos = Object(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* calcPosDistAway */])(this.endPos, this.unitVector, this.height * -1);

  }

  render(ctx) {
    // debugger
    ctx.drawImage(this.img, this.startPos[0] - (this.width/2) , this.startPos[1] - (this.height/2), this.width, this.height);
  }

  move() {
    this.startPos = Object(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* calcPosDistAway */])(this.startPos, this.unitVector, this.vel);
    this.endPos = Object(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* calcPosDistAway */])(this.endPos, this.unitVector, this.vel);
  }

  hitbox() {
    const adjust = (COLLIDABLE_WIDTH_RATIO/2) * this.width;

    const topLeft = [this.startPos[0] - adjust , this.startPos[1]];
    const bottomRight = [this.endPos[0] + adjust, this.endPos[1]];

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

  if (x >= topLeft[0] && x <= bottomRight[1]
    && y >= topLeft[1] && y <= bottomRight[1]) {
      inBox = true;
  }

  return inBox;
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map