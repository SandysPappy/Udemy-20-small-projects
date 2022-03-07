const body = document.getElementById('body');

const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container-total');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songTitles = ['BUS RIDE', 'LITE SPOTS', 'TRACK UNO'];
const songs = ['BUS_RIDE.mp3', 'LITE_SPOTS.mp3', 'TRACK_UNO.mp3'];
const coverImages = ['99.9.jpeg', 'lite_spots.jpeg', '99.9.jpeg'];

let songIndex = 1;

// init

// initally load sond details into DOM
loadSong(songIndex);

// Functions

function loadSong(songIndex) {
  title.innerText = songTitles[songIndex];
  audio.src = `music/${songs[songIndex]}`;
  cover.src = `images/${coverImages[songIndex]}`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

function nextSong() {
  songIndex = songIndex + 1 > songs.length - 1 ? 0 : songIndex + 1;
  loadSong(songIndex);
  if (musicContainer.classList.contains('play')) {
    audio.play();
  }
}

function prevSong() {
  songIndex = songIndex - 1 < 0 ? songs.length - 1 : songIndex - 1;
  loadSong(songIndex);
  if (musicContainer.classList.contains('play')) {
    audio.play();
  }
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  let progressPercent = currentTime / duration;
  if (!progressContainer.classList.contains('dragging')) {
    progress.style.width = `${100 * progressPercent}%`;
  }
}

// sets the progress UI given a windowX corrdinate
function setProgressUI(windowX) {}

function updateAudio(e) {
  //   const width = progressContainer.clientWidth;
  //   const clickX = e.offsetX;
  const duration = audio.duration;

  ////////////////////////////////

  const windowX = e.clientX;
  const { left, right, width } = progressContainer.getBoundingClientRect();

  // progressStart is how many pixels long the progress is
  progressStart = windowX - left;

  if (progressStart < 0) {
    progressStart = 0;
  }
  if (progressStart > width) {
    progressStart = width;
  }
  ///////////////////////////////////////

  audio.currentTime = (progressStart / width) * duration;

  console.log('mouseup');

  body.removeEventListener('mouseup', updateAudio);
  body.removeEventListener('mousemove', moveProgressBar);
  progressContainer.classList.remove('dragging');
}

function moveProgressBar(e) {
  const windowX = e.clientX;
  const { left, right, width } = progressContainer.getBoundingClientRect();

  // progressStart is how many pixels long the progress is
  progressStart = windowX - left;

  if (progressStart < 0) {
    progressStart = 0;
  }
  if (progressStart > width) {
    progressStart = width;
  }

  progress.style.width = `${(100 * progressStart) / width}%`;
}

function setProgressBar(e) {
  progressContainer.classList.add('dragging');
  body.addEventListener('mousemove', moveProgressBar);
  body.addEventListener('mouseup', updateAudio);
}

// Event listeners

playBtn.addEventListener('click', () => {
  // pause if already playing
  if (musicContainer.classList.contains('play')) {
    pauseSong();
  } else {
    playSong();
  }
});

// update song index and load song
// autoplay if already playing
nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('mousedown', setProgressBar);

audio.addEventListener('ended', nextSong);
