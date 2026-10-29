// dashboard.js - totals and recent IOUs. This page only READS data.
// Needs storage.js loaded first.

// ---------- 1. Find the elements once, at the top ----------
const owedToMeText = document.getElementById("owed-to-me");
const iOweText = document.getElementById("i-owe");
const netBalanceText = document.getElementById("net-balance");
const recentBody = document.getElementById("recent-body");