'use strict'
let countdown;
let timeDisplay = document.querySelector('.display-time');
const settingTime = document.querySelector('#setting-time');
const endTime = document.querySelector('#end-time');
const buttons = document.querySelectorAll('[data-time]');
const hour = document.querySelector('.hour');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');



function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  if (seconds > '0') {
    displayTimeLeft(seconds);
    displayEndTime(then);
  } else {
    alert("please set the correct time on your timer")
  }

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    } else {
      displayTimeLeft(secondsLeft);
    }

  }, 1000);
}

function displayTimeLeft(seconds) {

  const hours = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor(seconds / 60) % 60;
  const remainderSeconds = seconds % 60;
  let hourDisp = hour.innerText = `${hours < 10 ? '0' : ''}${hours}`;
  let minDisp = min.innerText = `${minutes < 10 ? '0' : ''}${minutes}`;
  let secDisp = sec.innerText = `${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = hourDisp + ':' + minDisp + ':' + secDisp;
  if (hourDisp === '00' && minDisp === '00' && secDisp === '00') {
    timeDisplay.textContent = "Get Back To Work";
    endTime.style.display = 'none';
    let countbacktext = setTimeout(() => {
      timeDisplay.textContent = '00' + ":" + '00' + ":" + '00';
    }, 5000);
  } else {
    timeDisplay.textContent = hourDisp + ":" + minDisp + ":" + secDisp;
    endTime.style.display = 'block';
  }

  //timeDisplay.innerText = `${hour}:${min}:${sec}`;
}

function displayEndTime(timestamp) {

  const end = new Date(timestamp);
  const hourEnd = end.getHours();
  const minEnd = end.getMinutes();
  endTime.innerText = `Timer ends at ${hourEnd}:${minEnd < 10 ? '0' : ''}${minEnd}`;

}

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let hours = this.hours.value;
  hours = hours < 0 ? '0' : hours;
  let mins = this.minutes.value;
  mins = mins < 0 ? '0' : mins;
  let secs = this.seconds.value;
  secs = secs < 0 ? '0' : secs;

  this.reset();
  const resultSecs = (hours * 3600) + (mins * 60) + parseInt(secs);
  timer(resultSecs);
})

const play = document.querySelector('#play-button');
const pause = document.querySelector('#pause-button');

const currentSeconds = () => {
  const pauseTimeSeconds = hour.innerText * 3600 + min.innerText * 60 + parseInt(sec.innerText);
  return pauseTimeSeconds;
}


pause.addEventListener('click', () => {
  clearInterval(countdown);
  currentSeconds();
})

play.addEventListener('click', () => {
  const seconds = currentSeconds();
  if (seconds > '0') {
    timer(seconds);
  } else {
    alert("There is no time to count back")
  }

})