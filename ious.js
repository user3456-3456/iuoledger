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

// ---------- 4. this code will draw the table from whatever list we give it ----------

function renderTable(list) {
  tableBody.innerHTML = ""; // wipe the old rows first
 
  list.forEach(function (iou) {
    const row = document.createElement("tr");
    const isPaid = iou.status === "paid";
 
    // style.css greys out and strikes through rows with the class "done".
    if (isPaid) {
      row.classList.add("done");
    }
 
    const directionCell = document.createElement("td");
    directionCell.appendChild(createPill(directionLabel(iou.direction), iou.direction));
 
    const amountCell = createCell(formatMoney(iou.amount));
    amountCell.classList.add("amount");
 
    const statusCell = document.createElement("td");
    statusCell.appendChild(createPill(isPaid ? "Paid" : "Unpaid", isPaid ? "paid" : "unpaid"));
 
    const actionsCell = document.createElement("td");
    actionsCell.appendChild(createActionButton(isPaid ? "Mark unpaid" : "Mark paid", "toggle", iou.id, ""));
    actionsCell.appendChild(document.createTextNode(" ")); // a space between the buttons
    actionsCell.appendChild(createActionButton("Delete", "delete", iou.id, "danger"));
 
    // Add the cells to the row in the same order as the table headings.
    row.appendChild(createCell(iou.person));
    row.appendChild(directionCell);
    row.appendChild(amountCell);
    row.appendChild(createCell(iou.dueDate || "-")); // "-" when no due date
    row.appendChild(createCell(iou.note || "-"));
    row.appendChild(statusCell);
    row.appendChild(actionsCell);
 
    tableBody.appendChild(row);
  });
}