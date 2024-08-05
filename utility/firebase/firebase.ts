import { initializeApp, getApps } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

let config = {
    disableEmulator: true,
    STORAGE_PATH: null,
    app: null,
    db: null,
    storage: null,
    auth: null,
    functions: null,
};

const initialize = ({ firebaseConfig, disableEmulator, STORAGE_PATH, emulatorHost = 'localhost' }) => {
    if (getApps().length === 0) {
        config.disableEmulator = disableEmulator;
        config.STORAGE_PATH = STORAGE_PATH;

        // Initialize Firebase
        config.app = initializeApp(firebaseConfig);
        config.auth = getAuth(config.app);
        config.db = initializeFirestore(config.app, { ignoreUndefinedProperties: true, experimentalForceLongPolling: true });
        config.storage = getStorage(config.app);
        config.functions = getFunctions(config.app);

        if (!config.disableEmulator) {
            connectFirestoreEmulator(config.db, emulatorHost, 8080);
            connectStorageEmulator(config.storage, emulatorHost, 9199);
            connectAuthEmulator(config.auth, `http://${emulatorHost}:9099`);
            connectFunctionsEmulator(config.functions, emulatorHost, 5001);
        }
    }
};

export { config, initialize, getApps };
