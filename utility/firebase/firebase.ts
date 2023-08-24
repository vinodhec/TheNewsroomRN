import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, initializeFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";


let config={
  disableEmulator:true,
  STORAGE_PATH:null,
  app:null,
  db:null,
  storage:null,
  auth:null
}

 const initialize=({firebaseConfig,disableEmulator,STORAGE_PATH,emulatorHost="localhost"})=>{
 

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
        connectAuthEmulator(config.auth, 'http://'+emulatorHost+':9099');

     
    
}
}

export {config,initialize};




