import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, initializeFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";


let config={
  disableEmulator:true,
  STORAGE_PATH:null,
  app:null,
  db:null,
  storage:null
}

 const initialize=({firebaseConfig,disableEmulator,STORAGE_PATH})=>{
 

  config.disableEmulator = disableEmulator;
  config.STORAGE_PATH = STORAGE_PATH;
  //   
  // Initialize Firebase
  config.app = initializeApp(firebaseConfig);

  config.db = initializeFirestore(config.app, { ignoreUndefinedProperties: true, experimentalForceLongPolling: true })


  if (!config.disableEmulator) {
    connectFirestoreEmulator(config.db, '192.168.29.13', 8080);
    config.storage = getStorage();

    // Create a storage reference from our storage service
        // Point to the Storage emulator running on localhost.
        connectStorageEmulator(config.storage, "localhost", 9199);
     
    
}
}

export {config,initialize};




