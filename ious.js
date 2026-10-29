// ious.js - view, search, filter, mark paid, delete
const searchBox = document.getElementById("search");
const directionSelect = document.getElementById("direction");
const statusSelect = document.getElementById("status");
const clearButton = document.getElementById("clear-filters");
const tableBody = document.getElementById("iou-body");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");

let allIOUs = loadIOUs();

function renderTable(list) {
  // TODO: clear tableBody, add one row per IOU, update resultCount and emptyMessage
}

function applyFilters() {
  // TODO: read the three controls, filter allIOUs, then call renderTable(matches)
}

searchBox.addEventListener("input", applyFilters);
directionSelect.addEventListener("change", applyFilters);
statusSelect.addEventListener("change", applyFilters);
// TODO: a click listener for clearButton
// TODO: one click listener on tableBody for the Mark paid / Delete buttons
// Tip: give each button data-id and data-action attributes when you build the row,
// then read them with event.target.dataset.id and event.target.dataset.action

applyFilters(); // draw the list when the page opens