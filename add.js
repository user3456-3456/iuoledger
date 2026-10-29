// add.js - the only page that CREATES IOUs.
// Needs storage.js loaded first (loadIOUs, saveIOUs, formatMoney,
// directionLabel, createPill).

// ---------- DOM ----------
const form = document.getElementById("iou-form");
const personInput = document.getElementById("person");
const amountInput = document.getElementById("amount");
const dueInput = document.getElementById("due");
const noteInput = document.getElementById("note");
const personError = document.getElementById("person-error");
const amountError = document.getElementById("amount-error");
const formError = document.getElementById("form-error");
const successMessage = document.getElementById("success-message");
const recentList = document.getElementById("recent-list");

// ---------- 2. Helpers to show and hide error messages ----------
// The "hidden" attribute is what hides an element. Setting it to false shows it.
function showError(element, message) {
  element.textContent = message;
  element.hidden = false;
}

function hideError(element) {
  element.textContent = "";
  element.hidden = true;
}

// ---------- 3. Validation ----------
// Checks the values, shows a message under each bad field, and
// returns true only when everything is fine.

// ---------- 3. Validation ----------
// Checks the values, shows a message under each bad field, and
// returns true only when everything is fine.
function validate(person, amount) {
  let isValid = true;
 
  if (person.length < 2) {
    showError(personError, "Enter the person's name (at least 2 characters).");
    isValid = false;
  } else {
    hideError(personError);
  }
 
  // "!(amount > 0)" is true for 0, negative numbers AND NaN (not a number).
  if (!(amount > 0)) {
    showError(amountError, "Enter an amount greater than 0.");
    isValid = false;
  } else {
    hideError(amountError);
  }
 
  return isValid;
}