import Board from './board';
import Timer from './timer';

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
    this.timer = new Timer(ROUND_TIME);
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

export default Game;
