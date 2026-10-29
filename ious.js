// ious.js - view, search, filter, mark paid / unpaid, delete.
// This page never creates IOUs (only add.js does). It reads them,
// and changes or removes existing ones.

// ---------- 1. Find the elements once, at the top ----------
const searchBox = document.getElementById("search");
const directionSelect = document.getElementById("direction");
const statusSelect = document.getElementById("status");
const clearButton = document.getElementById("clear-filters");
const tableBody = document.getElementById("iou-body");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");

// ---------- 2. Load the saved IOUs once when the page opens ----------
// "let" (not "const") because we replace this array after a delete.
let allIOUs = loadIOUs();

// ---------- 3. Build one action button ----------
// data-id and data-action are our own labels on the button. They tell the
// click handler later WHICH IOU and WHAT to do.
function createActionButton(label, action, id, extraClass) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = extraClass ? "btn " + extraClass : "btn";
  button.textContent = label;
  button.dataset.id = id;
  button.dataset.action = action;
  return button;
}