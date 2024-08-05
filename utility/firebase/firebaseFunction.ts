import { getFunctions, httpsCallable } from 'firebase/functions';
import { config } from "./firebase";


export const callableFunction = (functionName) => {
    console.log({ config, functionName })
    return httpsCallable(config.functions, functionName);
}

const FirebaseFunctions = { callableFunction }

export default FirebaseFunctions;
