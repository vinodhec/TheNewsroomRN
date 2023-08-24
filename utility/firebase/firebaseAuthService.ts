import { getAuth, signInWithCustomToken, updateProfile as updateProfileUser, updateEmail, signOut } from "firebase/auth";
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
const authWithcustomToken = (token) => {
  signInWithCustomToken(config.auth, token)
}

const FirebaseAuthService = { authWithcustomToken, logout, updateProfile, getCurrentUser, updateUserEmail }

export default FirebaseAuthService;

