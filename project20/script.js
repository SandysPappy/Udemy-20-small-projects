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

// insert list items into the DOM
function createList() {
  // creates a copy
  [...topCompanies].forEach((company, index) => {
    const listItem = document.createElement('li');

    // proper index for the order to check later
    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true" >
        <p class="person-name">${company}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;
    listItems.push(listItem);

    draggable_list.appendChild(listItem);
  });
}
