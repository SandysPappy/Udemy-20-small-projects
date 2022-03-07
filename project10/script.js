const body = document.getElementById('body');

const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container-total');
const volume = document.getElementById('volume-control');
const volumeContainer = document.getElementById('volume-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songTitles = ['BUS RIDE', 'LITE SPOTS', 'TRACK UNO'];
const songs = ['BUS_RIDE.mp3', 'LITE_SPOTS.mp3', 'TRACK_UNO.mp3'];
const coverImages = ['99.9.jpeg', 'lite_spots.jpeg', '99.9.jpeg'];

let songIndex = 1;
audio.volume = 1;

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

  cover.style.animation = 'rotate 10s linear infinite';

  audio.play();

  animation = setInterval(function () {
    drawWave();
  }, 20);
}

function pauseSong() {
  musicContainer.classList.remove('play');

  cover.style.animation = 'none';

  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();

  // pauses drawing animation
  clearInterval(animation);
  audioElement.pause();
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
  //On ended
  audioElement.onended = function () {
    //Stop drawing
    clearInterval(animation);

    //Clear previous y values
    drawY = [canvas.height];
  };
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

  // this is used twice and should be 1 function
  let progressStart = windowX - left;

  if (progressStart < 0) {
    progressStart = 0;
  }
  if (progressStart > width) {
    progressStart = width;
  }
  ///////////////////////////////////////

  audio.currentTime = (progressStart / width) * duration;

  body.removeEventListener('mouseup', updateAudio);
  body.removeEventListener('mousemove', moveProgressBar);
  progressContainer.classList.remove('dragging');
}

function moveProgressBar(e) {
  const windowX = e.clientX;
  const { left, right, width } = progressContainer.getBoundingClientRect();

  // progressStart is how many pixels long the progress is
  let progressStart = windowX - left;

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

function moveVolumeBar(e) {
  // totally ignoring dry principles here
  const windowX = e.clientX;
  const { left, right, width } = volumeContainer.getBoundingClientRect();

  // progressStart is how many pixels long the volume is
  let volumeStart = windowX - left;

  if (volumeStart < 0) {
    volumeStart = 0;
  }
  if (volumeStart > width) {
    volumeStart = width;
  }
  volume.style.width = `${(100 * volumeStart) / width}%`;
  audio.volume = volumeStart / width;
}

// progressContainer has dragging class
// need to remove it
function updateVolume(e) {
  const windowX = e.clientX;
  const { left, right, width } = volumeContainer.getBoundingClientRect();

  // progressStart is how many pixels long the volume is
  let volumeStart = windowX - left;

  if (volumeStart < 0) {
    volumeStart = 0;
  }
  if (volumeStart > width) {
    volumeStart = width;
  }
  volume.style.width = `${(100 * volumeStart) / width}%`;
  audio.volume = volumeStart / width;
  progressContainer.classList.remove('dragging');
  body.removeEventListener('mouseup', updateVolume);
  body.removeEventListener('mousemove', moveVolumeBar);
}

function setVolumeBar(e) {
  progressContainer.classList.add('dragging');
  body.addEventListener('mousemove', moveVolumeBar);
  body.addEventListener('mouseup', updateVolume);
}

// update song index and load song
// autoplay if already playing
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('mousedown', setProgressBar);
volumeContainer.addEventListener('mousedown', setVolumeBar);

audio.addEventListener('ended', nextSong);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// ////////////////////////////
// copied off stack overflow
//Step size (pixels per 20ms)
var stepSize = 10;

//Without var to make it a global variable accessable by the html onclick attribute
audioElement = document.getElementById('audio');
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();

// Bind our analyser to the media element source.
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

//Get frequency data (800 = max frequency)
var frequencyData = new Uint8Array(400);
//Use below to show all frequencies
//var frequencyData = new Uint8Array(analyser.frequencyBinCount);

//Create canvas
var canvas = document.getElementById('wave');
canvas.style.width = '500px';
canvas.style.height = '100px';

//High dpi stuff
canvas.width = parseInt(canvas.style.width) * 2;
canvas.height = parseInt(canvas.style.height) * 2;

//Get canvas context
var ctx = canvas.getContext('2d');

//Stroke color
ctx.strokeStyle = '#ff1eff';

//Draw thicker lines due to high dpi scaling
ctx.lineWidth = 1;

//Store y values
var drawY = [canvas.height];

//The animation reference
var animation;

// added to play above
//On play
// audioElement.onplay = function () {
//   //Start drawing
//   animation = setInterval(function () {
//     drawWave();
//   }, 20);
// };

//added to pause above
//On pause
// audioElement.onpause = function () {
//   //Stop drawing
//   clearInterval(animation);
// };

// dont want this. Already handled by pause
//On ended
// audioElement.onended = function () {
//   //Stop drawing
//   clearInterval(animation);

//   //Clear previous y values
//   drawY = [canvas.height];

//   //Prevent audio from looping (you can remove this if you want it to loop)
//   //   audioElement.pause();
// };

//Our drawing method
function drawWave() {
  // Copy frequency data to frequencyData array.
  analyser.getByteFrequencyData(frequencyData);

  //Total loudness of all frequencies in frequencyData
  var totalLoudness = 0;
  for (var i = 0; i < frequencyData.length; i++) {
    totalLoudness += frequencyData[i];
  }

  //Average loudness of all frequencies in frequencyData
  var averageLoudness = totalLoudness / frequencyData.length;

  //Scale of average loudness from (0 to 1), frequency loudness scale is (0 to 255)
  var y = averageLoudness / 255;
  //Multiply with canvas height to get scale from (0 to canvas height)
  y *= canvas.height;
  //Since a canvas y axis is inverted from a normal y axis we have to flip it to get a normal y axis value
  y = canvas.height - y;

  //Store new y value
  drawY.push(y);

  console.log(drawY.length);

  // prevents memory leak with the occational O(n) call
  if (drawY.length >= canvas.width) {
    drawY.splice(0, canvas.width / 2);
  }

  //Clear previous drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update styles
  //Draw line
  for (var i = drawY.length; i > 0; i--) {
    //calculate x values
    var x1 = canvas.width - (drawY.length - i - 1) * stepSize;
    var x2 = canvas.width - (drawY.length - i) * stepSize;

    //Stop drawing y values if the x value is outside the canvas
    if (!x2) {
      break;
    }
    ctx.beginPath();
    ctx.moveTo(x1, canvas.height);
    ctx.lineTo(x2, drawY[i]);
    ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(x2, canvas.height);
    // ctx.lineTo(x1, drawY[i]);
    // ctx.stroke();

    // Update Styles

    // Update Album Cover Size
    document.documentElement.style.setProperty(
      '--record-height',
      `${canvas.height - y + 50}px`
    );
    // getComputedStyle(document.documentElement).getPropertyValue(
    //   '--my-variable-name'
    // );

    // console.log('');
  }
}
