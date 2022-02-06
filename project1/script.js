const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  // careful using the add method. Then you need to
  // worry about removing the class later
  //   formControl.classList.add('error');

  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Stolen from stackoverflow
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function checkEmail(input) {
  if (validateEmail(input.value)) {
    showSuccess();
  } else {
    showError(input, 'Please enter a valid email.');
  }
}

function checkRequired(inputArr) {
  // high order array method that takes in a function
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  if (input.id === 'password2') {
    return 'Password';
  }
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
  len = input.value.length;
  if (len < min || len > max) {
    showError(
      input,
      `${getFieldName(input)} must be ${min}-${max} characters.`
    );
  }
}

function checkPasswordsMatch(p1, p2) {
  if (p1.value === p2.value) {
    showSuccess();
  } else {
    showError(password, 'Passwords do not match');
    showError(password2, '');
  }
}

form.addEventListener('submit', function (e) {
  // event parameter, doesnt submit the form
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkLength(password2, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
