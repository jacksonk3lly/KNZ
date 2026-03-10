import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const imagePreview = document.getElementById("imagePreview");
const fileInput = document.getElementById("fileInput");

async function retrieveImage() {
  try {
    const storageRef = ref(storage, `images/framephoto`);
    const imageURL = await getDownloadURL(storageRef);
    imagePreview.src = imageURL;
  } catch (error) {
    console.log("No remote image found yet, using default.");
  }
}

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // 1. Instant Preview (Local)
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.src = e.target.result;
  };
  reader.readAsDataURL(file);

  // 2. Automatic Upload to Firebase
  try {
    const storageRef = ref(storage, `images/framephoto`);
    await uploadBytes(storageRef, file);
    console.log("Uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

// Listen for file selection
fileInput.addEventListener("change", handleFileUpload);

// Initial load
retrieveImage();
