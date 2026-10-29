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