const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.innerText = currentYear + 1;

function updateCountdown() {
  const currentTime = new Date();
  // miliseconds until next year
  const diff = newYearTime - currentTime;

  // time until the new Year
  daysRemaining = Math.floor(diff / 1000 / 60 / 60 / 24);
  hoursRemaining = Math.floor(diff / 1000 / 60 / 60) % 24;
  minutesRemaining = Math.floor(diff / 1000 / 60) % 60;
  secondsRemaining = Math.floor(diff / 1000) % 60;

  // place into DOM
  days.innerText = daysRemaining < 10 ? '0' + daysRemaining : daysRemaining;
  hours.innerText = hoursRemaining < 10 ? '0' + hoursRemaining : hoursRemaining;
  minutes.innerText =
    minutesRemaining < 10 ? '0' + minutesRemaining : minutesRemaining;
  seconds.innerText =
    secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining;
}

setInterval(updateCountdown, 1000);
// show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);
