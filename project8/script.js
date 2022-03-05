const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  singleMealEl = document.getElementById('single-meal');

search_by_meal_name_url =
  'https://www.themealdb.com/api/json/v1/1/search.php?s=';

get_meal_by_id_url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
  // .path attribute gives the DOM tree starting at this element
  // going in reverse order bubbling up to the
  // ... -> body -> html -> document -> object window

  // const pathExample = e.path;
  // console.count(pathExample);

  // The find() method returns the first element in the provided array
  // that satisfies the provided testing function.
  // If no values satisfy the testing function, undefined is returned.

  // we need to bubble up here and return the first match because
  // we dont know if the target clicked is the h3 tag ot the meal-info div
  //
  // meal-info is undefined when clicking inside the meals div and not
  // on a meal-info div
  const mealInfo = e.path.find((div) => {
    if (div.classList) {
      return div.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid'); // id of meal from api
    getMealByID(mealID);
  }
});

// calls meal api with string from search bar
// updates ui generating list of meals
function searchMeal(e) {
  e.preventDefault(); // We don't want to submit (which is default behavior)

  // Clear single meal
  singleMealEl.innerHTML = '';

  const term = search.value;

  // Security risk!!!
  // The use of innerHTML here allows the mealfinder api to
  // do an XSS attack by sending us a script tag that could be
  // used to steal cookie information by sending our session cookies
  // from this site to another server... GLAD I FOUND THIS OUT MYSELF
  // BECAUSE THE UDEMY COURSE FAILED TO MENTION THIS

  // Instead of using innerHTML, we can instead use js to create a new
  // dom element and insert the data into the innerText of the dom element.
  // That way, if the api sends us a malicious script tag, that tag will be
  // shown as text within the html instead of running the script.
  // (But i'll do that next time...)
  if (!term.trim()) {
    console.log('Enter Something First!');
  } else {
    fetch(`${search_by_meal_name_url}${term.trim()}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `No Results Found`;
          mealsEl.innerHTML = '';
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealid="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `
            )
            // map returns array of these strings
            // So we need to concatinate them into one string for the html
            .join('');
        }
      });
  }
}

// This pattern is protected by most modern browsers, and wont be
// maliciousEl = document.createElement('div');
// maliciousEl.classList.add('mal');
// document.body.appendChild(maliciousEl);
// maliciousEl.innerHTML =
//   '<script>alert("Youve been XSSd"); location.reload(False);</script>';

function getMealByID(mealID) {
  fetch(`${get_meal_by_id_url}${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// the way the meal is formatted is annoying and horrible
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} -- ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
  `;
}

// Creates XXS safe element without using innerHTML
// type: str representing the element type
// class_list: arr of strings representing the classes to be added.
// white space in the class list will be removed
// inner_text: the string to be added inside element
function createElementWrapper(type, class_list, inner_text) {
  // should use documentfragment here instead
  const tmp = document.createElement(type);

  if (class_list) {
    class_list.forEach((cls) => {
      tmp.classList.add(cls.replaceAll(' ', ''));
    });
  }

  if (inner_text) {
    tmp.innerText = inner_text;
  }

  return tmp;
}
