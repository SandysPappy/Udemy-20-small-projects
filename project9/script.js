const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flowers', amount: -20.35 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10.77 },
  { id: 4, text: 'Camera', amount: -150.267 },
];

let transactions = dummyTransactions;

// not safe from XSS
function addTransactionToDOM(transaction) {
  // Get sign
  const profit = transaction.amount < 0 ? true : false;

  const item = document.createElement('li');

  item.classList.add(profit ? 'plus' : 'minus');

  item.innerHTML = `
    ${transaction.text}  <span>${profit ? '' : '('} $${Math.abs(
    transaction.amount
  )} ${profit ? '' : ')</span>'}
    <button class="delete-btn">X</button>
    `;

  list.appendChild(item);
}

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

// init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionToDOM);
}

init();
updateDOMValues();
