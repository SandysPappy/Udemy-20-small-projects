const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

// In correct order with most revenue at the top (Walmart)
//
// you could grab this from an api
const topCompanies = [
  'Walmart',
  'Amazon',
  'Apple',
  'CVS Health',
  'UnitedHealth Group',
  'Berkshire Hathaway',
  'McKesson',
  'AmerisourceBergen',
  'Alphabet',
  'Exxon Mobil',
];

const listItems = [];

let dragStartIndex;

createList();

// How to shuffle a list (JS doesn't have a shuffle method)
//
// const numbers = [1, 23, 545, 1898, 11234];
// // sort function requires a compare function. Otherwise the sort
// // method will default to sorting by string value instead of numberical value
// console.log(
//   numbers.sort(function (a, b) {
//     return a - b;
//   })
// );

// insert list items into the DOM
function createList() {
  // creates a copy
  [...topCompanies]
    .map((tmp) => ({ value: tmp, sort: Math.random() })) // returns array of encoded objects
    .sort((a, b) => a.sort - b.sort) // sorts array by encoded random number
    .forEach((company, index) => {
      // adds array to DOM
      const listItem = document.createElement('li');

      // proper index for the order to check later
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true" >
        <p class="person-name">${company.value}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;
      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

// In the following execution contexts, 'this' refers
// to the item object. These Item objects are what is executing
// each callback function
function dragStart() {
  //   console.log('Event: ', 'dragstart');

  // + converts to a Number
  // closest traverses the element's tree and returns the first
  // element matching the type (will return itself too). Returns null if not found
  // getAttribute returns the value of the attribute. (which is a string)
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
  //   console.log('Event: ', 'dragenter');
  this.classList.add('over');
}
function dragLeave() {
  //   console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}
// Need to handle the drag over event here in order to allow a Drop event
function dragOver(e) {
  e.preventDefault();
  //   console.log('Event: ', 'dragover');
}
function dragDrop() {
  //   console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[toIndex].appendChild(itemOne);
  listItems[fromIndex].appendChild(itemTwo);
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}
