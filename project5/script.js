const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort-richest');
const calculateWealthBtn = document.getElementById('calculate-wealth');

const url = 'https://randomuser.me/api';

let data = [];

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch(url);
  const data = await res.json();

  user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: (Math.random() * 1200000).toFixed(2),
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function doubleMoney() {
  data = data.map((user) => {
    // console.log({ ...user, name: `${user.name} doubled` });
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  // Javascript uses string compare by default
  // Meaning 1, 2, 11, 0 => 0, 1, 11, 2
  // Need to pass in a compare method to sort by int value
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function filterMillionaires() {
  data = data.filter((person) => person.money >= 1000000);
  updateDOM();
}

function reduceMoney() {
  // accumulator, how to accumulate, bias inital value
  wealth = data.reduce((acc, user) => (acc += parseInt(user.money)), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// defaults to the data array
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((person) => {
    const element = document.createElement('div');
    element.classList.add('person'); // adds class to this elements class list
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(num) {
  // Create our number formatter.
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(num); /* $2,500.00 */
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaires.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', reduceMoney);
