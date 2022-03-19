const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

function showData(data) {}

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
