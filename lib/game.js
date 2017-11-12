import Board from './board';
import Timer from './timer';

const CANNON_DELAY = 300;
const ROUND_TIME = 60;

class Game {
  constructor(board, canvas) {
    this.board = board;
    this.canvas = canvas;
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
    this.display = this.display.bind(this);
    this.canShoot = true;
    this.timer = new Timer(ROUND_TIME);
    this.level = 1;
    this.setUp();
  }

  resetGame() {
    this.timer.seconds = ROUND_TIME;
    this.backgroundMusic.pause();
    this.level = 1;
    this.board.resetBoard();
  }

  levelUp() {
    this.level += 1;
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
          if(this.board.gameOver()) {
          this.gameOverModal.className = "pop-up";
          this.handlePlayPause();
          }
          if(this.levelModal.className === "pop-up visible") {
            this.levelModal.className = "pop-up";
            this.handlePlayPause();

          }
          break;
        case " ":
          this.handleLaserShot();
          break;
      }
    });

    this.playPause.addEventListener("click", (e) => {
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

  }

  handlePlayPause() {
    this.board.paused = this.board.paused ? false : true;
    if (this.board.paused) {
      this.backgroundMusic.pause();
      if(!this.board.gameOver()) {
        this.pauseModal.className = "pop-up visible";
      }
    } else {
      this.backgroundMusic.play();
      this.startModal.className = "pop-up";
      this.pauseModal.className = "pop-up";
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
