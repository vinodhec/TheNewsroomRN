import { collection, addDoc, getDoc, doc, getDocs, limit as dbLimit, orderBy as dbOrderBy, query as dbQuery, where, GeoPoint, serverTimestamp, collectionGroup, setDoc, startAfter, getCountFromServer, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

import { concatMap, from, lastValueFrom, map, Observable, of } from 'rxjs';
import { omit } from 'lodash';
import { config } from "./firebase";


console.log('storage execution')




const getCollectionRef = (collectionName, isCollectionGroup?): any => {
    console.log(config)
    return !!isCollectionGroup ? collectionGroup(config.db, collectionName) : collection(config.db, collectionName)
}

const getDocumentRef = (collectionName, documentID) => {
    console.log(collectionName, documentID)
    return doc(config.db, collectionName, documentID);

}

const createDocument = async (collectionName, values) => {
    console.log(collectionName, values)

    const doc = await addDoc(getCollectionRef(collectionName), { ...values, timestamp: serverTimestamp() });
    return doc;
}

const deleteDocument = async (collectionName, id) => {

    console.log({ collectionName, id })

    return deleteDoc(getDocumentRef(collectionName, id))

}

const createDocumentById = async (collectionName, id, values) => {

    const doc = await setDoc(getDocumentRef(collectionName, id), { ...values, timestamp: serverTimestamp() });
    return doc;
}


const getDocumentByID = (collectionName, docId, isStream = false): any => {
    const docRef = getDocumentRef(collectionName, docId);
    if (isStream) {
        return new Observable((subscriber) => {

            const unsub = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    subscriber.next({ id: doc.id, ...doc.data() })
                }
                else {
                    subscriber.next(null)
                    subscriber.complete();
                }

            });

            return unsub
        })
    }
    else {
        return lastValueFrom(from(getDoc(docRef)).pipe(map((doc) => {
            if (doc.exists()) {
                return { id: doc.id, ...doc.data() };
            }
            return null;

        })));

    }



}

function isPromise(value) {
    return Boolean(value && typeof value.then === 'function');
}
const updateDocument = async (collectionName, docId, values) => {

    const doc = getDocumentRef(collectionName, docId);
    values = omit(values, ['timestamp'])
    return await updateDoc(doc, { ...values, updatedTimestamp: serverTimestamp() })
}

// updateDocument('users', '9443125052', { wishlist: arrayUnion('3') }).then((data) => {

// updateDocument('users', '9443125052', { wishlist: arrayRemove('2') }).then((data) => {

const getQueries = (collectionName, options) => {

    let { count, query, orderBy, limit, orderByDir, isCollectionGroup, cursorId, isStream } = options;
    limit = limit ?? 10;
    let formattedQueries: any = [];

    if (query) {
        for (let qq of query) {
            if (qq?.[0] === 'id' && qq?.[2]) {


                const pr = getDocumentByID(collectionName, qq[2], isStream);

                return isPromise(pr) ? pr.then((docs) => {

                    return { count: 1, docs: [docs], cursorId: null, hasNext: false }
                }) : pr.pipe(map((docs) => {

                    return { count: 1, docs: [docs], cursorId: null, hasNext: false }
                }));




            }
            if (qq[2] || qq?.[3] === 'boolean') {
                formattedQueries.push(where.apply(null, qq))
            }

        }
    }
    if (orderBy) {
        formattedQueries.push(dbOrderBy(orderBy, orderByDir))
    }

    if (cursorId) {
        formattedQueries.push(startAfter(cursorId))
    }



    let collectionRef = dbQuery(getCollectionRef(collectionName, isCollectionGroup), ...formattedQueries)


    return from([2]).pipe(
        concatMap(() => {

            if (!count) {
                return from(getCountFromServer(collectionRef)).pipe(map((count) => {

                    return count.data().count
                }));

            }
            else {
                return of(count)
            }

        }),
        concatMap((count) => {

            if (limit) {
                formattedQueries.push(dbLimit(limit))
            }

            collectionRef = dbQuery(getCollectionRef(collectionName, isCollectionGroup), ...formattedQueries)

            return of({ formattedQueries, collectionRef, count, isCollectionGroup, limit })

        })


    )



}

const getDocumentsStream = (collectionName, options): any => {
    return from(getQueries(collectionName, { ...options, isStream: true })).pipe(concatMap((queries: any) => {
        if (queries?.docs) {
            return of(queries)
        }

        let { collectionRef, count, limit } = queries;


        const observable = new Observable((subscriber) => {


            const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
                let docs: any = []

                querySnapshot.forEach((doc: any) => {
                    // doc.data() is never undefined for query doc snapshots
                    //
                    docs.push({ ...(doc.data() as any), id: doc.id, })
                });

                subscriber.next(options.hasOwnProperty('cursorId') ? { count, docs, cursorId: querySnapshot.docs[querySnapshot.docs.length - 1], hasNext: querySnapshot.size === limit } : docs)

            });
            return unsubscribe

        });
        //

        return observable;
    }));




}

const getDocuments = (collectionName, options): any => {


    return lastValueFrom(from(getQueries(collectionName, options)).pipe(concatMap((queries: any) => {

        // if (!queries) {
        //     return of([])
        // }

        if (queries?.docs) {
            return of(queries)
        }

        let { collectionRef, count, limit } = queries;

        return from(getDocs(collectionRef)).pipe(map((querySnapshot: any) => {
            let docs: any = []


            //
            querySnapshot.forEach((doc: any) => {
                // doc.data() is never undefined for query doc snapshots
                //
                docs.push({ ...(doc.data() as any), id: doc.id, })
            });
            return options.hasOwnProperty('cursorId') ? { count, docs, cursorId: querySnapshot.docs[querySnapshot.docs.length - 1], hasNext: querySnapshot.size === limit } : docs;

        }))



    })))

}


// getDocumentByID('news', '00nLX4VKNNuBd3qNjZI7').then((data) => {
//    
// })

// createDocument('Properties', { city: 'Chennai', location: 'Madipakkam', propertyType: 'Appartment / Flat' }).then((data) => {

// getDocuments('properties', { query: [["locality", "==", "navalur"], ["city", "==", "chennai"], ["propertyGroup", "==", "Commerical"]] }).then((data) =>

const FirestoreService = { getDocumentsStream, createDocument, getDocumentByID, getDocuments, updateDocument, createDocumentById, GeoPoint, deleteDocument }

export default FirestoreService;