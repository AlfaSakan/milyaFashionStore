// Import the functions you need from the SDKs you need
import { env } from "$lib/constants/env.constant";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import {
  extractExtFromBase64,
  extractExtFromFile,
  generateRandomName,
} from "./string.util";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const imagesRef = ref(storage, "images");

export async function uploadImages(data: File) {
  const fileRef = ref(
    imagesRef,
    `${generateRandomName()}.${extractExtFromFile(data)}`
  );

  const snapshot = await uploadBytes(fileRef, data);
  return getDownloadURL(snapshot.ref);
}

export async function uploadImagesBase64(data: string) {
  const now = new Date();
  const formatedDate = now.toLocaleDateString("id-ID").replaceAll("/", "-");
  const ext = extractExtFromBase64(data);
  const randomUUID = crypto.randomUUID();

  const fileRef = ref(imagesRef, `${randomUUID}${formatedDate}.${ext}`);

  const snapshot = await uploadString(fileRef, data, "data_url");
  return getDownloadURL(snapshot.ref);
}

export async function uploadFileList(files: FileList) {
  const urls: string[] = [];
  for (const file of files) {
    const url = await uploadImages(file);
    urls.push(url);
  }

  return urls;
}
