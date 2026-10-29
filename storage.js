// storage.js - shared by every page.
// Each HTML page loads this file BEFORE its own JS file, so the
// functions below already exist when the page's own code runs.

// The name (key) our data is saved under in localStorage.
const STORAGE_KEY = "ious";

// ---------- Saving and loading ----------
 
// Read all saved IOUs. Always returns an array (empty if nothing is saved).