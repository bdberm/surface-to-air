import Board from './board';



class Game {
  constructor(board, canvas) {
    this.board = board;
    this.canvas = canvas;
    // this.paused = true;
    this.playPause = document.getElementById('play-pause');

    this.laserShot = new Audio("./assets/laser.wav");
    this.laserShot.volume = 0.2;
    this.backgroundMusic = new Audio("./assets/background.mp3");
    this.display = this.display.bind(this);

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
      this.board.addLaser();
      this.laserShot.play();
    });

    window.addEventListener("keypress", (e) => {
      switch (e.key) {
        case "p":
          this.handlePlayPause();
          break;
        case " ":
          this.board.addLaser();
          this.laserShot.play();
          break;


      }
    });

    this.playPause.addEventListener("click", (e) => {
      this.handlePlayPause();
    });

  }

  handlePlayPause() {
    this.board.paused = this.board.paused ? false : true;
    if (this.board.paused) {
      this.backgroundMusic.pause();
    } else {
      this.backgroundMusic.play();
    }
  }

  display() {
    this.playPause.textContent = this.board.paused ? "Play" : "Pause";
    window.requestAnimationFrame(this.display);
  }

}

export default Game;
