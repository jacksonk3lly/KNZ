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

async function retiriveImage() {
  const storageRef = ref(storage, `images/framephoto`);
  const imageURL = await getDownloadURL(storageRef);
  imagePreview.src = imageURL;
}

async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const storageRef = ref(storage, `images/framephoto`);
    await uploadBytes(storageRef, file);
  }
}

const uploadButton = document.getElementById("uploadButton");
uploadButton.addEventListener("click", () => {
  uploadImage();
  retiriveImage();
});
retiriveImage();
