const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
// const pauseBtn =  document.getElementById('pause')
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon(e) {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function updateVideoProgress() {
  progress.value = (100 * video.currentTime) / video.duration;
  let secs = String(Math.floor(video.currentTime % 60));
  if (secs < 10) {
    secs = '0' + String(secs);
  } else {
    secs = String(secs);
  }

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  } else {
    mins = String(mins);
  }

  timeStamp.innerHTML = mins + ':' + secs;
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateVideoProgress);

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
