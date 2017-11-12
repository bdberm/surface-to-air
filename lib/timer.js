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

export default Timer;
