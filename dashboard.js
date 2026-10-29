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

    const net = owedToMe - iOwe;
 
  // Put a + or - in front of the net balance (nothing when it is exactly 0).
  let sign = "";
  if (net > 0) {
    sign = "+";
  } else if (net < 0) {
    sign = "-";
  }

    owedToMeText.textContent = formatMoney(owedToMe);
    iOweText.textContent = formatMoney(iOwe);
    // Math.abs removes the minus so we don't get a double sign like "--".
    netBalanceText.textContent = sign + formatMoney(Math.abs(net));
}