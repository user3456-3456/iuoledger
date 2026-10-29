// storage.js - shared by every page.
// Each HTML page loads this file BEFORE its own JS file, so the
// functions below already exist when the page's own code runs.

// The name (key) our data is saved under in localStorage.
const STORAGE_KEY = "ious";

// ---------- Saving and loading ----------
 
// Read all saved IOUs. Always returns an array (empty if nothing is saved).
function loadIOUs() {
  try {
    // localStorage only stores text. getItem gives us that text, or null.
    const saved = localStorage.getItem(STORAGE_KEY);
 
    // First visit: nothing saved yet, so start with an empty list.
    if (!saved) {
      return [];
    }

     // Turn the saved text back into a real JavaScript array.
    const parsed = JSON.parse(saved);
 
    // Safety check: if the saved data is damaged, don't crash the page.
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // JSON.parse throws an error if the text is broken. We catch it here.
    console.error("Could not read IOUs:", error);
    return [];
  }
}

// Save the whole IOU array. Returns true if it worked, false if it failed.
function saveIOUs(ious) {
  try {
    // Turn the array into text, then store it under our key.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ious));
    return true;
  } catch (error) {
    // Can happen if the browser blocks storage or it is full.
    console.error("Could not save IOUs:", error);
    return false;
  }
}

// ---------- Display helpers (used by more than one page) ----------
 
// Turn a number into money text: 1250 -> "Ksh1,250.00"
function formatMoney(amount) {
  return "Ksh" + Number(amount).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Our data stores direction as "in" or "out". People should read words.
function directionLabel(direction) {
  return direction === "in" ? "Owes me" : "I owe";
}