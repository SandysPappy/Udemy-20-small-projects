// NOTE: the placeholder api does not return more than 100 total pages!
//
// post example
// https://jsonplaceholder.typicode.com/posts?_limit=3&_page=2

const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 10;
let page = 1;
const apiURL = `https://jsonplaceholder.typicode.com/`;

// returns a promise 'data'
async function getPosts() {
  const res = await fetch(`${apiURL}posts?_limit=${limit}&_page=${page}`); // returns promise
  const data = await res.json(); // returns promise

  return data; // is a promise
}

// post format
//
//   <div class="post">
//     <div class="number">1</div>
//     <div class="post-info">
//       <h2 class="post-title">First Posts Title</h2>
//       <p class="post-body">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
//         cupiditate fugit beatae facere! Obcaecati magni temporibus deserunt
//         officia saepe ab rerum dignissimos! Non, fugit veniam?
//       </p>
//     </div>
//   </div>

// populates the post info by calling the jsonplaceholder api
// should be xss safe unlike the Udemy course
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    // creating the post elements
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    const numberEl = document.createElement('div');
    numberEl.classList.add('number');

    const postInfoEl = document.createElement('div');
    postInfoEl.classList.add('post-info');

    const postTitleEl = document.createElement('h2');
    postTitleEl.classList.add('post-title');

    const postBodyEl = document.createElement('p');
    postBodyEl.classList.add('post-body');

    //Adding the json data
    numberEl.innerText = post['id'];
    postTitleEl.innerText = post['title'];
    postBodyEl.innerText = post['body'];

    // Gluing elements together

    postsContainer.appendChild(postEl);
    postEl.appendChild(numberEl);
    postEl.appendChild(postInfoEl);
    postInfoEl.appendChild(postTitleEl);
    postInfoEl.appendChild(postBodyEl);
  });
}

// toggles the loading animation
function showLoading() {
  loading.classList.add('show');
}

function removeLoading() {
  loading.classList.remove('show');
}

// appends new data to the page when at the bottom.
// Also activates the loading icon
function checkBottom(e) {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  // plus 1 for rounding errors edge case
  if (scrollTop + clientHeight + 1 >= scrollHeight) {
    showLoading();
    // so fast, gotta slow it down to look better
    setTimeout(() => {
      page++;
      showPosts();

      removeLoading();
    }, 750);
  }
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();

  //   const termRegex = new RegExp(term);

  const posts = document.querySelectorAll('.post'); // node list

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    // gives index of match
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// init
showPosts();

// detects scroll to bottom of page and loads new data
window.addEventListener('scroll', checkBottom);

filter.addEventListener('input', filterPosts);
