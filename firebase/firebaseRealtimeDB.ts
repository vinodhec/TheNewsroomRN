import { getDatabase, ref, child, get } from "firebase/database";

export const dbRef = ref(getDatabase());
export const getHistoryDetails=(date)=>{

    return get(child(dbRef, `history/details/${date}`)).then((snapshot) => {
        if (snapshot.exists()) {
         return snapshot.val();
        } 
      }).catch((error) => {
        console.error(error);
      });
}