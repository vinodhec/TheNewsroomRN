import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, initializeFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";


let config = {
  disableEmulator: true,
  STORAGE_PATH: null,
  app: null,
  db: null,
  storage: null,
  auth: null
}
const STORAGE_PATH = ''
const disableEmulator = true;

const firebaseConfig = {
  apiKey: "AIzaSyCu7BVRb3IkmG7De8SaJEcxPNYJ4X_WdP8",
  authDomain: "buyzzle-4dd35.firebaseapp.com",
  projectId: "buyzzle-4dd35",
  storageBucket: "buyzzle-4dd35.appspot.com",
  messagingSenderId: "625756835065",
  appId: "1:625756835065:web:6e9604b7453f5c8b75a628",
  measurementId: "G-QLBB6D8K2R",
}
console.log('initialize', firebaseConfig, disableEmulator)
config.disableEmulator = disableEmulator;
const emulatorHost = 'localhost'
config.STORAGE_PATH = STORAGE_PATH;
//   
// Initialize Firebase

config.app = initializeApp(firebaseConfig);
config.auth = getAuth(config.app);

config.db = initializeFirestore(config.app, { ignoreUndefinedProperties: true, experimentalForceLongPolling: true })


if (!config.disableEmulator) {
  connectFirestoreEmulator(config.db, emulatorHost, 8080);
  config.storage = getStorage();

  // Create a storage reference from our storage service
  // Point to the Storage emulator running on localhost.
  connectStorageEmulator(config.storage, emulatorHost, 9199);
  connectAuthEmulator(config.auth, 'http://' + emulatorHost + ':9099');



}
console.log(config)

const initialize = ({ firebaseConfig, disableEmulator, STORAGE_PATH, emulatorHost = "localhost" }) => {
  firebaseConfig = {
    apiKey: "AIzaSyCu7BVRb3IkmG7De8SaJEcxPNYJ4X_WdP8",
    authDomain: "buyzzle-4dd35.firebaseapp.com",
    projectId: "buyzzle-4dd35",
    storageBucket: "buyzzle-4dd35.appspot.com",
    messagingSenderId: "625756835065",
    appId: "1:625756835065:web:6e9604b7453f5c8b75a628",
    measurementId: "G-QLBB6D8K2R",
  },
    console.log('initialize', firebaseConfig, disableEmulator)
  config.disableEmulator = disableEmulator;
  config.STORAGE_PATH = STORAGE_PATH;
  //   
  // Initialize Firebase

  config.app = initializeApp(firebaseConfig);
  config.auth = getAuth(config.app);

  config.db = initializeFirestore(config.app, { ignoreUndefinedProperties: true, experimentalForceLongPolling: true })


  if (!config.disableEmulator) {
    connectFirestoreEmulator(config.db, emulatorHost, 8080);
    config.storage = getStorage();

    // Create a storage reference from our storage service
    // Point to the Storage emulator running on localhost.
    connectStorageEmulator(config.storage, emulatorHost, 9199);
    connectAuthEmulator(config.auth, 'http://' + emulatorHost + ':9099');



  }
  console.log(config)
}

export { config, initialize };




