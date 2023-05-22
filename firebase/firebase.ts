import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyBDiI1pePAJ0gCaxoGs0mwKAKwsjhpRYWM",
    authDomain: "thenewsroom-f5e02.firebaseapp.com",
    databaseURL: "https://thenewsroom-f5e02.firebaseio.com",
    projectId: "thenewsroom-f5e02",
    storageBucket: "thenewsroom-f5e02.appspot.com",
    messagingSenderId: "463401124803",
    appId: "1:463401124803:web:89692f1c32b16f25dff376",
    measurementId: "G-7S3V8B764V"
  };
  console.log({firebaseConfig})
//   
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 
export default app;