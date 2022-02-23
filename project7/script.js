const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// number of body parts drawn until player loses
totalIncorrectAllowed = 6;

// could do an api here
const words = ['alien', 'programmer', 'wizard', 'hangman', 'deeeeeeeeee'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Detect keypresses
window.addEventListener('keydown', (e) => {
  // KeyCode is depricated
  if (e.code.includes('Key')) {
    letter = e.code[3].toLowerCase();

    // a correct letter
    if (selectedWord.includes(letter)) {
      // already inserted
      if (correctLetters.includes(letter)) {
        shakeRepeatedCorrectLetter(letter);
        return;
      }

      correctLetters.push(letter);
      displayWord();
    }

    // incorrect letter
    else {
      if (wrongLetters.includes(letter)) {
        showNotification();
        return;
      }
      wrongLetters.push(letter);
      updateWrongLetters();
    }
  }
});

// Restart Game from button
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popup.style.display = 'none';
});

// shows the hidden words
function displayWord() {
  wordEl.innerHTML = `
    ${
      selectedWord
        .split('')
        .map(
          (letter) =>
            `<span class="letter">${
              correctLetters.includes(letter) ? letter : ''
            }</span>`
        )
        .join('') // turns back into a string
    }
    `;
  // replaces new line characters with empty string using regex
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  //   console.log(wordEl.innerText, innerWord);

  checkForWinPopup(innerWord);
}

function checkForWinPopup(innerWord) {
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Winner!';
    popup.style.display = 'flex';
  }
}

// Note this method is bad since spamming the wrong letter
// creates a call stack of timeouts which makes the notification
// wonky after repeated presses.
// The shakeRepeatedCorrectLetter achieves this with a better animation flow
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// note: this mutates the DOM by leaving
// style="animation-play-state: paused;"
// inside the element of the shaken letters
// This is a method of doing animations without a magic number (set-timeout ms)
function shakeRepeatedCorrectLetter(letter) {
  // adds shake-me class to each letter el in word
  [...wordEl.children].map((letterEl) => {
    if (letterEl.innerHTML === letter) {
      letterEl.classList.add('shake-me');

      letterEl.addEventListener('animationend', () => {
        letterEl.style.animationPlayState = 'paused';
        letterEl.classList.remove('shake-me');
      });
      letterEl.style.animationPlayState = 'running';
    }
  });
}

function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? `<p>Wrong Letters</p>` : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // update figure and update loss popup
  figureParts.forEach((figPart, index) => {
    const errors = wrongLetters.length;

    // shows every part
    if (errors >= totalIncorrectAllowed) {
      figureParts.forEach((figPart2) => {
        figPart2.style.display = 'block';
      });
      finalMessage.innerText = 'You Lose 😞';
      popup.style.display = 'flex';
    }
    // shows parts before losing
    else if (index < errors) {
      figPart.style.display = 'block';
    } else {
      figPart.style.display = 'none';
    }
  });
}

displayWord();
