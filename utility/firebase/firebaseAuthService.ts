import { getAuth, signInWithCustomToken, updateProfile as updateProfileUser, updateEmail, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { config } from "./firebase";




const updateProfile = async (values) => {
  await updateProfileUser(getCurrentUser(), values)

}
const updateUserEmail = async (email) => {
  await updateEmail(getCurrentUser(), email)

}

const getCurrentUser = (): any => {
  const auth = getAuth();
  return auth.currentUser
}
const logout = () => {
  const auth = getAuth();
  return signOut(auth)
}


const onAuthStateChanged = (cb) => {
  const auth = getAuth();
  return auth.onAuthStateChanged(cb)
}
const loginWithEmail = ({ email, password }) => {

  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)

}
const authWithcustomToken = (token) => {
  return signInWithCustomToken(config.auth, token)
}

const createAccountWithEmailAndPassword = (email, password) => {
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password)

}

const FirebaseAuthService = { onAuthStateChanged, createAccountWithEmailAndPassword, loginWithEmail, authWithcustomToken, logout, updateProfile, getCurrentUser, updateUserEmail }

export default FirebaseAuthService;

