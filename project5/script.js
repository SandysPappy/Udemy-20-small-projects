const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('show-millionaires');
const showMillionaires = document.getElementById('sort-richest');
const sortBtn = document.getElementById('calculate-wealth');
const calculateWealthBtn = document.getElementById('double');

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
