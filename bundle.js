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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(3);



const gameWidth = 500;
const gameHeight = 300;
const windowWidth = Math.max(window.windowWidth, gameWidth);
const windowHeight = Math.max(window.windowHeight, gameHeight);


document.addEventListener("DOMContentLoaded",() => {

  const canvas = document.getElementById('canvas');
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  const gameBoard = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](canvas);


  gameBoard.render();

  canvas.addEventListener("mousemove", (e) => {

    
    const coords = [e.offsetX, e.offsetY];
    gameBoard.crossHair.pos = coords;

  });

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crosshair__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannon__ = __webpack_require__(4);



class Board {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.crossHair = new __WEBPACK_IMPORTED_MODULE_0__crosshair__["a" /* default */]();
    this.mainCannon = new __WEBPACK_IMPORTED_MODULE_1__cannon__["a" /* default */]([canvas.width/2, canvas.height]);
    this.render = this.render.bind(this);
  }

  render() {


    this.ctx.clearRect(0,0, this.gameWidth, this.gameHeight);

    // this.ctx.fillStyle = Board.BACKGROUND_COLOR;
    // this.ctx.fillRect(0,0,gameWidth, gameHeight);

    this.crossHair.render(this.ctx);
    this.mainCannon.render(this.ctx, this.crossHair.pos);


    window.requestAnimationFrame(() => this.render(this.gameWidth, this.gameHeight));
  }

}

Board.BACKGROUND_COLOR = "#FFFFFF";



/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CrossHair {
  constructor() {

    this.pos =  [0,0];
    this.width = 10;
    this.height = 10;

  }

  render(ctx) {

    ctx.fillRect(this.pos[0] - (this.width/2) , this.pos[1] - (this.height/2), this.width, this.height);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (CrossHair);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const calcDist = (pos1, pos2) => {
  
  const dist = Math.sqrt(
    Math.pow((pos2[0] - pos1[0]),2) +
    Math.pow((pos2[1] - pos1[1]),2)
  );
  return dist;
};
/* unused harmony export calcDist */



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CANNON_LENGTH = 20;
const CANNON_WIDTH = 5;

// const Cannon = (startPos, endPos, ctx) => {
// };

class Cannon {
  constructor(startPos) {
    this.width = CANNON_WIDTH;
    this.length = CANNON_LENGTH;
    this.startPos = startPos;

  }

  render(ctx, endPos) {


    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(endPos[0], endPos[1]);
    ctx.lineWidth = this.width;
    ctx.stroke();
    ctx.closePath();

  }

}

/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map