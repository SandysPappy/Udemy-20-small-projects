const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Don't do this in prod. It's not a safe use of .innerHTML
//
// updates the DOM with data using the api's object notation
function showData(data) {
  let output = '';

  data.data.forEach((song) => {
    output += `
    <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}"
    data-songtitle="${song.title}"
     >Get Lyrics</button>
    </li>
    `;
  });

  result.innerHTML = `
    <ul class="songs">
    ${output}
    </ul>
`;

  // adds the next and prev page button
  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ''
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ''
    }
    `;
  } else {
    more.innerHTML = '';
  }
}

// see README.md for details
// need to requst access from heroku server to work
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

// calls api and updates the DOM
async function searchSongs(term) {
  // gross callback nesting hell
  //   fetch(`${apiURL}/suggest/${term}`);
  // .then((res) => res.json())
  // .then((data) => console.log(data));

  // remember fetch returns a Promise. So we can instead
  // handle that Promise using async await instead of nested .then()'s
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  // replaces all newlines with html line breaks (pretty gross)
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;

  more.innerHTML = '';
}

// calls search api with form data and updates the DOM
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener('click', (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songTitle');

    getLyrics(artist, songTitle);
  }
});
