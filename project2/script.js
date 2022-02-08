const container = document.querySelector('.container');

// grabs all seats and puts them into a node list
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// updates total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  // unpacks (spreads) the array and passes in values of selected seats
  // map returns an array of seat indicies of selected seats
  // Note this way ignores the indicies of alreeady occupies seats
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// save selected movie index and price
function setMovieData(index, price) {
  localStorage.setItem('selectedMovieIndex', index);
  localStorage.setItem('selectedMoviePrice', price);
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // populates the seat icons
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // if its not in the array, indexOf returns -1
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  //   setMovieData(selectedMovieIndex, selectedMoviePrice);
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  // plus operater parses as an int
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', (e) => {
  //   console.log(e.target);

  // valid unoccupied seat click event
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// on page load
updateSelectedCount();
