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


// ---------- 4. Show the 3 newest IOUs (so this page displays data too) ----------
function renderRecent() {
  const ious = loadIOUs();
 
  // slice(-3) takes the last 3 items; reverse() puts the newest first.
  const newestThree = ious.slice(-3).reverse();
 
  recentList.innerHTML = ""; // clear the old list before redrawing
 
  if (newestThree.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Nothing saved yet. Your newest IOUs will show here.";
    recentList.appendChild(emptyItem);
    return;
  }
 
  newestThree.forEach(function (iou) {
    const item = document.createElement("li");
 
    // Left side: name + coloured label
    const left = document.createElement("span");
    left.textContent = iou.person + " ";
    left.appendChild(createPill(directionLabel(iou.direction), iou.direction));
 
    // Right side: the amount
    const right = document.createElement("span");
    right.textContent = formatMoney(iou.amount);
 
    item.appendChild(left);
    item.appendChild(right);
    recentList.appendChild(item);
  });
}

// ---------- 5. Handle the form being submitted ----------
form.addEventListener("submit", function (event) {
  // Stop the browser from reloading the page - we handle the form ourselves.
  event.preventDefault();
 
  // Clear messages left over from the last attempt.
  successMessage.hidden = true;
  hideError(formError);
 
  // Read what the user typed. trim() removes spaces at the start and end.
  const person = personInput.value.trim();
  // Input values are always TEXT. Number() turns "120" into the number 120.
  const amount = Number(amountInput.value);
  // Find whichever radio button is ticked and read its value ("in" or "out").
  const direction = document.querySelector('input[name="direction"]:checked').value;
 
  // Stop here if anything is invalid. Nothing gets saved.
  if (!validate(person, amount)) {
    return;
  }

    // Build one IOU as an object.
  const newIOU = {
    id: Date.now(),                           // unique number (milliseconds since 1970)
    person: person,
    amount: Math.round(amount * 100) / 100,   // keep exactly 2 decimal places
    direction: direction,                     // "in" = they owe me, "out" = I owe them
    dueDate: dueInput.value,                  // "" if left empty
    note: noteInput.value.trim(),
    status: "unpaid"
  };