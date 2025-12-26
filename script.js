// Ensure success message is hidden on page load
document.addEventListener("DOMContentLoaded", () => {
  const successMessage = document.querySelector(".success-message");
  if (successMessage) successMessage.style.display = "none";
});
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Grab the form
const form = document.getElementById("contact-form");

// Flag to track if the user has attempted to submit
let hasSubmitted = false;

// ------------------- Inputs -------------------

// First Name
const firstName = document.getElementById("first-name");
const firstNameError = firstName.nextElementSibling;

// Last Name
const lastName = document.getElementById("last-name");
const lastNameError = lastName.nextElementSibling;

// Email
const email = document.getElementById("email");
const emailError = email.nextElementSibling;

// Message
const message = document.getElementById("message");
const messageError = message.nextElementSibling;

// Query Type
const queryGroup = document.getElementById("query-group");
const queryRadios = queryGroup.querySelectorAll('input[type="radio"]');
const queryError = queryGroup.querySelector(".error-message");

// Consent Checkbox
const consent = document.getElementById("consent-checkbox");
const consentError = consent
  .closest(".checkbox-group")
  .querySelector(".error-message");

// ------------------- Helper Functions -------------------
const successMessage = document.querySelector(".success-message");

function showError(input, errorEl) {
  errorEl.style.display = "block";
  input.classList.add("form-input--error");
}

function hideError(input, errorEl) {
  errorEl.style.display = "none";
  input.classList.remove("form-input--error");
}

// ------------------- SUBMIT HANDLER -------------------

form.addEventListener("submit", (e) => {
  hasSubmitted = true; // mark that submit has been attempted
  let isValid = true;
  e.preventDefault(); // always stop reload

  // First Name validation
  if (!firstName.value.trim()) {
    showError(firstName, firstNameError);
    isValid = false;
  }

  // Last Name validation
  if (!lastName.value.trim()) {
    showError(lastName, lastNameError);
    isValid = false;
  }

  // Email validation
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    showError(email, emailError);
    isValid = false;
  }

  // Message validation
  if (!message.value.trim()) {
    showError(message, messageError);
    isValid = false;
  }

  // Query Type validation (at least one selected)
  const querySelected = Array.from(queryRadios).some((r) => r.checked);
  if (!querySelected) {
    showError(queryGroup, queryError);
    isValid = false;
  }

  // Consent checkbox validation
  if (!consent.checked) {
    showError(consent, consentError);
    isValid = false;
  }

  // Stop submission if any field is invalid
  if (!isValid) return;

  // ✅ success: show banner, form stays
  successMessage.style.display = "block";
});

// ✅ success: show banner, form stays
// ------------------- CLEAR ERRORS ON USER INTERACTION -------------------

// First Name input
firstName.addEventListener("input", () => {
  if (!hasSubmitted) return;
  if (firstName.value.trim()) {
    hideError(firstName, firstNameError);
  }
});

// Last Name input
lastName.addEventListener("input", () => {
  if (!hasSubmitted) return;
  if (lastName.value.trim()) {
    hideError(lastName, lastNameError);
  }
});

// Email input
email.addEventListener("input", () => {
  if (!hasSubmitted) return;
  if (email.value.trim() && emailRegex.test(email.value)) {
    hideError(email, emailError);
  }
});

// Message input
message.addEventListener("input", () => {
  if (!hasSubmitted) return;
  if (message.value.trim()) {
    hideError(message, messageError);
  }
});

// Query Type radios
queryRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!hasSubmitted) return;
    if (Array.from(queryRadios).some((r) => r.checked)) {
      hideError(queryGroup, queryError);
    }
  });
});

// Consent checkbox
consent.addEventListener("change", () => {
  if (!hasSubmitted) return;
  if (consent.checked) {
    hideError(consent, consentError);
  }
});
