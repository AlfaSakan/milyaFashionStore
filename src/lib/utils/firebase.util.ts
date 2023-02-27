// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from "firebase/app";
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
export function firebase(options: FirebaseOptions) {
  // Initialize Firebase
  const app = initializeApp(options);
  const storage = getStorage(app);
  return ref(storage, "images");
}

export async function uploadImages(data: File, options: FirebaseOptions) {
  const imagesRef = firebase(options);
  const fileRef = ref(
    imagesRef,
    `${generateRandomName()}.${extractExtFromFile(data)}`
  );

  const snapshot = await uploadBytes(fileRef, data);
  return getDownloadURL(snapshot.ref);
}

export async function uploadImagesBase64(
  data: string,
  options: FirebaseOptions
) {
  const imagesRef = firebase(options);
  const ext = extractExtFromBase64(data);

  const fileRef = ref(imagesRef, `${generateRandomName()}.${ext}`);

  const snapshot = await uploadString(fileRef, data, "data_url");
  return getDownloadURL(snapshot.ref);
}

export async function uploadFileList(
  files: FileList,
  options: FirebaseOptions
) {
  const urls: string[] = [];
  for (const file of files) {
    const url = await uploadImages(file, options);
    urls.push(url);
  }

  return urls;
}
