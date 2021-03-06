// THIS PROJECT IS NOT SAFE FROM XSS ATTACKS!
// Copy and paste the following line into the Item
// in the form and see what happens!
// <img src="x" onerror="alert('HACKED! I just stole all of your login info and sent it to my database!')"/>

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flowers', amount: -20.35 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10.77 },
//   { id: 4, text: 'Camera', amount: -150.267 },
// ];

let transactions =
  localStorage.getItem('transactions') !== null
    ? JSON.parse(localStorage.getItem('transactions'))
    : [];

// adds the data from a transaction event to the DOM
// and adds the new transaction object to local storage
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add an item and dollar amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value.trim(),
      amount: Number(Number(amount.value).toFixed(2)), // lol
    };

    transactions.push(transaction);

    addTransactionToDOM(transaction); // adds transaction div

    updateDOMValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Do not do this in real production because of possible collisions
function generateID() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

// not safe from XSS
function addTransactionToDOM(transaction) {
  // Get sign
  const profit = transaction.amount > 0 ? true : false;

  const item = document.createElement('li');

  item.classList.add(profit ? 'plus' : 'minus');

  item.innerHTML = `
    ${transaction.text}  <span>${profit ? '' : '('} $${Math.abs(
    transaction.amount
  )} ${profit ? '' : ')</span>'}
    <button class="delete-btn" onclick="removeTransactionByID(${
      transaction.id
    })">X</button>
    `;

  list.appendChild(item);
}

// updates the balance, income, and expenses in the DOM
function updateDOMValues() {
  // adds up all income transactions starting at $0
  let income = transactions.reduce(
    (total, next) => total + (next.amount > 0 ? next.amount : 0),
    0
  );

  // adds up all expenses transactions starting at $0
  let expenses = transactions.reduce(
    (total, next) => total + (next.amount < 0 ? next.amount : 0),
    0
  );

  const total = (income + expenses).toFixed(2);
  income = income.toFixed(2); // after adding to not deal with string conversions
  expenses = Math.abs(expenses).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expenses}`;
}

// removes a transaction from local storage and under History the DOM
function removeTransactionByID(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  updateDOMValues();

  init();
}

// sets the local storage to the current transactions array
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionToDOM);
}

init();
updateDOMValues();

form.addEventListener('submit', addTransaction);
