// storage.js - shared by every page
const STORAGE_KEY = "ious";

function loadIOUs() {
  try {
    // TODO: read STORAGE_KEY; return the parsed array, or [] if nothing is saved
  } catch (error) {
    console.error("Could not read IOUs:", error);
    return [];
  }
}

function saveIOUs(ious) {
  try {
    // TODO: turn the array into text and save it under STORAGE_KEY
  } catch (error) {
    console.error("Could not save IOUs:", error);
  }
}