import { disableEmulator } from '../constants';
import app from './firebase'


import { connectStorageEmulator, deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

const storage = getStorage();

// Create a storage reference from our storage service
if ( !disableEmulator) {
    // Point to the Storage emulator running on localhost.
    connectStorageEmulator(storage, "localhost", 9199);
}


const uploadFile = (file, fullFilePath) => {
    // if (!(file instanceof File)) {
    //     return new Promise(resolve => {
    //         return resolve(file.preview.url);
    //     })
    // }
    console.log({file,fullFilePath})
    const storageRef = ref(storage, fullFilePath);

    return uploadBytes(storageRef, file).then((snapshot) => {
        return getDownloadURL(snapshot.ref)
    });

    // uploadTask.on('state_changed',
    //     (snapshot) => {
    //         // Observe state change events such as progress, pause, and resume
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //        
    //         if(progress==100){
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                
    //                 updateDownloadUrl(downloadURL)
    //               });
    //         }

    //         switch (snapshot.state) {
    //             case 'paused':
    //                
    //                 break;
    //             case 'running':
    //                
    //                 break;
    //         }
    //     },
    //     (error) => {
    //         // Handle unsuccessful uploads
    //     },
    //     () => {

    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...

    //     }
    // );
    // return await getDownloadURL(uploadTask.snapshot.ref)

}
const deleteFile = (fileDownloadUrl) => {
    const decodeUrl = decodeURIComponent(fileDownloadUrl);
    const startIndex = decodeUrl.indexOf("/o/") + 3;
    const endIndex = decodeUrl.indexOf("?");
    const filepath = decodeUrl.substring(startIndex, endIndex);
    const refToDelete = ref(storage, filepath)
    return deleteObject(refToDelete)
}
// deleteFile('http://localhost:9199/v0/b/maadiveedu-6b8ce.appspot.com/o/file.png?alt=media&token=1859f4d4-44cd-4f99-890b-d22b567fdec1').then((data) => {
//    
// })

const FirebaseStorageService = { uploadFile, deleteFile }
export default FirebaseStorageService