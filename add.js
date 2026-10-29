// add.js - the only page that creates IOUs
const form = document.getElementById("iou-form");
const personInput = document.getElementById("person");
const amountInput = document.getElementById("amount");
const dueInput = document.getElementById("due");
const noteInput = document.getElementById("note");
const personError = document.getElementById("person-error");
const amountError = document.getElementById("amount-error");
const successMessage = document.getElementById("success-message");
const recentList = document.getElementById("recent-list");

function renderRecent() {
  // TODO: load the IOUs, clear recentList, add the 3 newest as <li> items
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // TODO: read the fields, validate, build the object, load, push, save, reset the form
  // Tip: show or hide a message with  element.hidden = false / true
  // Tip: the chosen radio is  document.querySelector('input[name="direction"]:checked').value
});

renderRecent(); // show saved IOUs when the page opens