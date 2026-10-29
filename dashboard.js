// dashboard.js - totals and recent IOUs. This page only READS data.
// Needs storage.js loaded first.

// ---------- 1. Find the elements once, at the top ----------
const owedToMeText = document.getElementById("owed-to-me");
const iOweText = document.getElementById("i-owe");
const netBalanceText = document.getElementById("net-balance");
const recentBody = document.getElementById("recent-body");

// ---------- 2. Load the saved IOUs ----------
const ious = loadIOUs();

// ---------- 3. Work out the three totals ----------
function showTotals() {
  let owedToMe = 0; // money other people owe me
  let iOwe = 0;     // money I owe other people
 
  ious.forEach(function (iou) {
    // Only UNPAID IOUs count. Paid ones are settled.
    if (iou.status === "unpaid") {
      if (iou.direction === "in") {
        owedToMe += iou.amount;
      } else {
        iOwe += iou.amount;
      }
    }
  });

}

// ---------- 4. Fill the "Recent IOUs" table with the 5 newest ----------
function showRecent() {
  recentBody.innerHTML = ""; // clear anything already in the table
 
  // Empty state: one row that spans all 5 columns.
  if (ious.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = createCell("No IOUs yet. Use Add IOU to record your first one.");
    emptyCell.colSpan = 5;
    emptyRow.appendChild(emptyCell);
    recentBody.appendChild(emptyRow);
    return;
  }

    // slice(-5) = last 5 items, reverse() = newest first.
  const newestFive = ious.slice(-5).reverse();
 
  newestFive.forEach(function (iou) {
    const row = document.createElement("tr");
    const isPaid = iou.status === "paid";
 
    if (isPaid) {
      row.classList.add("done"); // grey + strikethrough from style.css
    }
 
    const directionCell = document.createElement("td");
    directionCell.appendChild(createPill(directionLabel(iou.direction), iou.direction));
 
    const amountCell = createCell(formatMoney(iou.amount));
    amountCell.classList.add("amount");
 
    const statusCell = document.createElement("td");
    statusCell.appendChild(createPill(isPaid ? "Paid" : "Unpaid", isPaid ? "paid" : "unpaid"));
 
    row.appendChild(createCell(iou.person));
    row.appendChild(directionCell);
    row.appendChild(amountCell);
    row.appendChild(createCell(iou.dueDate || "-"));
    row.appendChild(statusCell);
 
    recentBody.appendChild(row);
  });
}

// ---------- 5. Run both when the page opens ----------
showTotals();
showRecent();