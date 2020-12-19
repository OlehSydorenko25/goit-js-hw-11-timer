const daysRef = document.querySelector('[data-value="days"]');
const hoursRef = document.querySelector('[data-value="hours"]');
const minsRef = document.querySelector('[data-value="mins"]');
const secsRef = document.querySelector('[data-value="secs"]');

class CountdownTimer {
  constructor({ targetDate, updateTime }) {
    this.updateTime = updateTime;
    this.targetDate = targetDate;
  }

  prestart() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    const time = this.getTime(deltaTime);
    this.updateTime(time);
  }

  start() {
    this.prestart();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTime(deltaTime);
      this.updateTime(time);
    }, 1000);
  }

  getTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  targetDate: new Date('Jan 1, 2021'),
  updateTime: updateTime,
});

function updateTime({ days, hours, mins, secs }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minsRef.textContent = mins;
  secsRef.textContent = secs;
}

timer.start();