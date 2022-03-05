const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flowers', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: -150 },
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

// init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionToDOM);
}

init();
