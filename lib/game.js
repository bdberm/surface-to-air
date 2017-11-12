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
    this.laserShot = new Audio("./assets/laser.wav");
    this.laserShot.volume = 0.2;
    this.backgroundMusic = new Audio("./assets/background.mp3");
    this.display = this.display.bind(this);
    this.canShoot = true;
    this.timer = new Timer(ROUND_TIME);
    this.setUp();
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

  }

  handlePlayPause() {
    this.board.paused = this.board.paused ? false : true;
    if (this.board.paused) {
      this.backgroundMusic.pause();
    } else {
      this.backgroundMusic.play();
    }
  }

  handleLaserShot() {
    if (this.canShoot) {
      this.board.addLaser();
      this.laserShot.play();
      this.canShoot = false;
      window.setTimeout(() => {this.canShoot = true;}, CANNON_DELAY);
    }
  }

  display() {
    this.playPause.textContent = this.board.paused ? "Play" : "Pause";
    this.timeDisplay.textContent = this.timer.display();
    window.requestAnimationFrame(this.display);
  }

}

export default Game;
