import app from './firebase'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, connectAuthEmulator, signInWithCustomToken } from "firebase/auth";
import { disableEmulator } from '../Utils/Constants';

const auth = getAuth(app);
if (window.location.hostname === "localhost" && !disableEmulator) {
    connectAuthEmulator(auth, "http://localhost:9099");

}
auth.languageCode = 'en';

const assignCaptacha = () => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {

            // reCAPTCHA solved, allow signInWithPhoneNumber.

        }
    }, auth);
}

const signin = (phoneNumber) => {



    signInWithPhoneNumber(auth, '+91' + phoneNumber, (window as any).recaptchaVerifier).then((result) => {
        (window as any).confirmationResult = result;



    })
        .catch((err) => {
            alert(err);
            // window.location.reload()
        });
}

const confirmCode = (code) => {
    return (window as any).confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;


        return user;
        // ...
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
    });
}

const updateProfile = (values) => {
    auth.updateCurrentUser(values);

}
const getCurrentUser = (): any => {
    return auth.currentUser
}
const logout = () => {
    auth.signOut();
}
const authWithcustomToken = (token) => {
    signInWithCustomToken(auth, token)
}

const FirebaseAuthService = { authWithcustomToken, logout, signin, confirmCode, assignCaptacha, updateProfile, getCurrentUser }

export default FirebaseAuthService;

