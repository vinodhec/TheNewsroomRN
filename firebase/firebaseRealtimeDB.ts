import app from './firebase'
console.log({ app })
import { getDatabase, ref, child, get, set } from "firebase/database";

export const dbRef = ref(getDatabase());
export const getHistoryDetails = (date) => {

  return get(child(dbRef, `history/details/${date}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
  }).catch((error) => {
    console.error(error);
  });
}
export const updateHistoryDetails = (date, content) => {
  return set(child(dbRef, `history/details/${date}`), content).then((snapshot) => {

  }).catch((error) => {
    console.error(error);
  });
}