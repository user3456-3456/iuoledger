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