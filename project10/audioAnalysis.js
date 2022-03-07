//Step size (pixels per 20ms)
var stepSize = 7;

//Without var to make it a global variable accessable by the html onclick attribute
audioElement = document.getElementById('audioElement');
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
ctx.strokeStyle = '#ffff00';

//Draw thicker lines due to high dpi scaling
ctx.lineWidth = 2;

//Store y values
var drawY = [canvas.height];

//The animation reference
var animation;

//On play
audioElement.onplay = function () {
  //Start drawing
  animation = setInterval(function () {
    drawWave();
  }, 20);
};

//On pause
audioElement.onpause = function () {
  //Stop drawing
  clearInterval(animation);
};

//On ended
audioElement.onended = function () {
  //Stop drawing
  clearInterval(animation);

  //Clear previous y values
  drawY = [canvas.height];

  //Prevent audio from looping (you can remove this if you want it to loop)
  audioElement.pause();
};

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

  //Clear previous drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    ctx.moveTo(x1, drawY[i - 1]);
    ctx.lineTo(x2, drawY[i]);
    ctx.stroke();
  }
}
