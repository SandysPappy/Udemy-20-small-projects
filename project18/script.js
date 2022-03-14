// canvas reference: https://developer.mozilla.org/en-US/docs/Web/API/Path2D
//
// TRIGGER WARNING: MAGIC NUMBERS AHEAD

const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

const canvas = document.getElementById('canvas'); // element
const ctx = canvas.getContext('2d'); // context

let score = 0;

const brickRowCount = 9;
const brickColCount = 5;

// The canvas context is an object with properties and methods
// you can use to render graphics inside the canvas element.
// The context can be either '2d' or 3d using 'webgl'

// toggle rules
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  rules.classList.remove('show');
});

// Game Plan
//
// 1. Create canvas context
//
// 2. Create and draw ball
//
// 3. Create and draw paddle
//
// 4. Create bricks
//
// 5. Draw score
//
// 6. Animations update() - redraw the canvas - requestAnimationFrame(callback)
//
// 7. Move the paddle with keyboard event handlers
//
// 8. Move the ball
// - add wall boundaries
// - increase score when bricks break
// - redraw the bricks and reset the score when you lose

// create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10, // size in pixels
  speed: 4,
  dx: 4, // moves up and down
  dy: -4,
};

// Create ball props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0, // only moves up and down
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// create bricks in memory
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (j = 0; j < brickColCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

console.time();
// not doing for each here because I wanna be faster
// literlly TENS of nanoseconds faster! lol
function drawBricks() {
  for (let i = 0; i < brickRowCount; i++) {
    for (let j = 0; j < brickColCount; j++) {
      ctx.beginPath();
      ctx.rect(bricks[i][j].x, bricks[i][j].y, bricks[i][j].w, bricks[i][j].h);
      ctx.fillStyle = '#0095dd';
      ctx.fill();
      ctx.closePath();
    }
  }
}

// draws on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  ctx.stroke();
  ctx.fillStyle = '#0095dd';

  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// only moves on x-axis
function movePaddle() {
  paddle.x += paddle.dx;

  // right boundary
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  // left boundary
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// updates drawing and animation
function update() {
  movePaddle();
  drawAll();
  requestAnimationFrame(update);
}

function keyDown(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    paddle.dx = paddle.speed;
  }
  if (e.key == 'Left' || e.key == 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}
function keyUp(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    paddle.dx = 0;
  }
  if (e.key == 'Left' || e.key == 'ArrowLeft') {
    paddle.dx = 0;
  }
}

update();

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// rules and close handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
