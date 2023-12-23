document.addEventListener('DOMContentLoaded', function () {
  
  loadExpenses();
});

var AmountContainer = 0;
var totalAmount = document.getElementById('TotalPanel1');
 
 


function addExpense() {
  var expenseName = document.getElementById('name').value;
  var expenseDate = document.getElementById('date').value;
  var expenseAmount = parseFloat(document.getElementById('amount').value);

 
  if (expenseAmount === '' || expenseDate === '' ||  expenseAmount <= 0) {
    alert("Fill out the blanks.");
    return;
  }
  else if (isNaN(expenseAmount)) {
    alert("Enter valid amount.");
    return;
  }

  var newExpense = {
    name: expenseName,
    date: expenseDate,
    amount: expenseAmount
  };

  var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  addExpenseToTable(newExpense);

  document.getElementById('name').value = '';
  document.getElementById('date').value = '';
  document.getElementById('amount').value = '';
}

function addExpenseToTable(expense) {
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  var dateCell = document.createElement('td');
  var amountCell = document.createElement('td');

  nameCell.textContent = expense.name;

  var dateObject = new Date(expense.date);
  var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  var day = dateObject.getDate();
  var month = monthNames[dateObject.getMonth()];
  var year = dateObject.getFullYear();

  var writtenDate = month + ' ' + day + ', ' + year;
  dateCell.textContent = writtenDate;

  amountCell.innerHTML = `₱${expense.amount.toLocaleString()}`;
  AmountContainer += expense.amount;
  totalAmount.innerHTML = `Total ₱${AmountContainer.toLocaleString()}`;

 
  var removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.addEventListener('click', function () {
    removeExpense(expense);
    newRow.remove();
  });

  removeButton.style.width = 'fit-content'; 
  removeButton.style.margin = 'auto 10px';
  removeButton.style.backgroundColor = 'black';
  removeButton.style.color = 'white';  
  removeButton.style.padding = '5px 10px';  
  removeButton.style.border = 'none';  
  removeButton.style.cursor = 'pointer';  
  removeButton.style.hover
  removeButton.style.alignItems = 'center'; 

  
  amountCell.appendChild(removeButton);

  newRow.appendChild(nameCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(amountCell);

  var tableBody = document.getElementById('expenseTableBody');
  tableBody.appendChild(newRow);
}

function removeExpense(expense) {
  var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  var index = expenses.findIndex(e => e.name === expense.name && e.date === expense.date && e.amount === expense.amount);
  if (index !== -1) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    AmountContainer -= expense.amount;
    totalAmount.innerHTML = `Total ₱${AmountContainer.toLocaleString()}`;
  }
}

function loadExpenses() {
  var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.forEach(function (expense) {
    addExpenseToTable(expense);
  });
}
