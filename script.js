// const form = document.querySelector(".contact__form");
// const firstName = document.getElementById("first-name");

// form.addEventListener("submit", (e) => {
//   if (!firstName.value.trim()) {
//     e.preventDefault(); // stop submission
//     firstName.classList.add("invalid");
//   }
// });

// firstName.addEventListener("input", () => {
//   if (firstName.value.trim()) {
//     firstName.classList.remove("invalid");
//   }
// });



// Query Type
const queryRadios = document.querySelectorAll('input[name="query-type"]');
const queryError = document.querySelector('.query-group .error-message');

form.addEventListener('submit', (e) => {
  const isSelected = Array.from(queryRadios).some(radio => radio.checked);
  if (!isSelected) {
    e.preventDefault(); // block submission
    queryError.style.display = 'block'; // show error
  } else {
    queryError.style.display = 'none'; // hide error
  }
});

// Hide error when user selects an option
queryRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      queryError.style.display = 'none';
    }
  });
});
