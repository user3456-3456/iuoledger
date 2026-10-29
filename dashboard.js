// dashboard.js - totals and recent IOUs (read only)
const owedToMe = document.getElementById("owed-to-me");
const iOwe = document.getElementById("i-owe");
const netBalance = document.getElementById("net-balance");
const recentBody = document.getElementById("recent-body");

const ious = loadIOUs();

function showTotals() {
  // TODO: add up the unpaid amounts for each direction, then write the three numbers
}

function showRecent() {
  // TODO: take the 5 newest IOUs and add one table row for each
}

showTotals();
showRecent();