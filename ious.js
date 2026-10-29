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

// ---------- 5. Read all three controls, filter, then redraw ----------
// ONE function reads search + direction + status together, so the
// filters never fight each other.
function applyFilters() {
  const query = searchBox.value.trim().toLowerCase();
  const direction = directionSelect.value; // "all", "in" or "out"
  const status = statusSelect.value;       // "all", "unpaid" or "paid"
 
  // slice() makes a copy so reverse() doesn't change the real array.
  // reverse() puts the newest IOU at the top.
  const newestFirst = allIOUs.slice().reverse();
 
  const matches = newestFirst.filter(function (iou) {
    // includes() is true if the name contains the typed text. An empty
    // search matches everything. toLowerCase() makes it case-insensitive.
    const matchesName = iou.person.toLowerCase().includes(query);
    const matchesDirection = direction === "all" || iou.direction === direction;
    const matchesStatus = status === "all" || iou.status === status;
 
    // An IOU is kept only if ALL three are true.
    return matchesName && matchesDirection && matchesStatus;
  });

    renderTable(matches);
  resultCount.textContent = "Showing " + matches.length + " of " + allIOUs.length + " IOUs";
 
  // Two different empty messages for two different situations.
  if (allIOUs.length === 0) {
    emptyMessage.textContent = "No IOUs yet. Use Add IOU to record your first one.";
    emptyMessage.hidden = false;
  } else if (matches.length === 0) {
    emptyMessage.textContent = "No IOUs match your search or filters.";
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }
}

// ---------- 6. Events ----------
// "input" fires on every keystroke; "change" fires when a dropdown changes.
searchBox.addEventListener("input", applyFilters);
directionSelect.addEventListener("change", applyFilters);
statusSelect.addEventListener("change", applyFilters);
 
clearButton.addEventListener("click", function () {
  searchBox.value = "";
  directionSelect.value = "all";
  statusSelect.value = "all";
  applyFilters();
  });

  // ONE click listener on the table body handles every button in every row.
// This is called event delegation. We need it because the rows are rebuilt
// each time, so listeners attached to individual buttons would disappear.
tableBody.addEventListener("click", function (event) {
  // closest("button") finds the button that was clicked (or null if the
  // click landed somewhere else in the table).
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

    // dataset values are text, so convert the id back into a number.
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
 
  if (action === "toggle") {
    // find() returns the first IOU whose id matches.
    const iou = allIOUs.find(function (item) {
      return item.id === id;
    });
    if (iou) {
      iou.status = iou.status === "paid" ? "unpaid" : "paid";
    }
  } else if (action === "delete") {
    // confirm() shows an OK / Cancel box and returns true or false.
    if (!confirm("Delete this IOU? This cannot be undone.")) {
      return;
    }
    // filter() keeps everything EXCEPT the IOU with this id.
    allIOUs = allIOUs.filter(function (item) {
      return item.id !== id;
    });
  }
   
  // Save the change, then redraw. applyFilters() (not renderTable) keeps
  // the user's search and filters in place.
  if (!saveIOUs(allIOUs)) {
    alert("Could not save your change. Your browser may be blocking storage.");
  }
  applyFilters();
});

// ---------- 7. Draw the list when the page first opens ----------
applyFilters();