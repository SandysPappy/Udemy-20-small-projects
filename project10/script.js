const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-containter-total');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songTitles = ['BUS RIDE', 'LITE SPOTS', 'TRACK UNO'];
const songs = ['BUS_RIDE.mp3', 'LITE_SPOTS.mp3', 'TRACK_UNO.mp3'];
const coverImages = ['99.9.jpeg', 'lite_spots.jpeg', '99.9.jpeg'];

let songIndex = 1;

// initally load sond details into DOM
loadSong(songIndex);

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
nextBtn.addEventListener('click', () => {
  songIndex = songIndex + 1 > songs.length - 1 ? 0 : songIndex + 1;
  loadSong(songIndex);
  if (musicContainer.classList.contains('play')) {
    audio.play();
  }
});

prevBtn.addEventListener('click', () => {
  songIndex = songIndex - 1 < 0 ? songs.length - 1 : songIndex - 1;
  loadSong(songIndex);
  if (musicContainer.classList.contains('play')) {
    audio.play();
  }
});
