import app from './firebase'
import { getAuth,signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier, connectAuthEmulator, signInWithCustomToken, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword } from "firebase/auth";


const disableEmulator = true;
const auth = getAuth(app);
if (!disableEmulator) {
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

const adminLogin=(email,password)=>{


    return signInWithEmailAndPassword(auth, email, password,)
    // .catch((error) => {

    // console.log(error.message,error.code)
    // const errorCode = error.code;
    // const errorMessage = error.message;})
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
const googleSignin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    console.log(signInWithRedirect)
    signInWithRedirect(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
const create = () => {
    createUserWithEmailAndPassword(auth, 'test@test.com', 'abcd1234')
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
}
const FirebaseAuthService = { create,auth, googleSignin, authWithcustomToken, logout, signin,adminLogin, confirmCode, assignCaptacha, updateProfile, getCurrentUser }

export default FirebaseAuthService;


