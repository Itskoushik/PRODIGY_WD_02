let timer;
let running = false;
let time = 0;
let laps = [];

function startStop() {
  if (!running) {
    timer = setInterval(updateTime, 10); // Update every 10 milliseconds
    document.getElementById('startStopBtn').textContent = 'Stop';
    running = true;
  } else {
    clearInterval(timer);
    document.getElementById('startStopBtn').textContent = 'Start';
    running = false;
  }
}

function updateTime() {
  time++;
  const formattedTime = formatTime(time);
  document.querySelector('.time').innerHTML = formattedTime;
}

function formatTime(time) {
  let hours = Math.floor(time / 100 / 60 / 60);
  let minutes = Math.floor(time / 100 / 60) % 60;
  let seconds = Math.floor(time / 100) % 60;
  let milliseconds = time % 100;

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  milliseconds = (milliseconds < 10) ? `0${milliseconds}` : milliseconds;

  return `${hours}:${minutes}:${seconds}<span class="milliseconds">${milliseconds}</span>`;
}

function lapReset() {
  if (running) {
    const currentLapTime = formatTime(time);
    laps.push(currentLapTime);
    displayLaps();
  } else {
    time = 0;
    laps = [];
    document.querySelector('.time').innerHTML = '00:00:00<span class="milliseconds">00</span>';
    document.querySelector('.laps').textContent = '';
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  time = 0;
  laps = [];
  document.getElementById('startStopBtn').textContent = 'Start';
  document.querySelector('.time').innerHTML = '00:00:00<span class="milliseconds">00</span>';
  document.querySelector('.laps').textContent = '';
}

function displayLaps() {
  const lapsContainer = document.querySelector('.laps');
  lapsContainer.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapElement = document.createElement('div');
    lapElement.innerHTML = `Lap ${index + 1}: ${lap}`;
    lapsContainer.appendChild(lapElement);
  });
}
