import * as functions from "firebase-functions";



import * as admin from 'firebase-admin';
admin.initializeApp();
const truncate = (input: any, length: number) => input.length > length ? `${input.substring(0, length)}...` : input;


exports.sendNotifications = functions.firestore.document('news/{messageId}').onCreate(
     async (snapshot: any) => {
          // Notification details.
          const news = snapshot.data();
          const hasNoNotifyDelimiter = news.title.substr(news.title.length-1) === " ";
          const payload = {
               notification: {
                    title: news.title,
                    body: truncate(news.content, 100).replace(/(<([^>]+)>)/ig, ""),
                    // icon: 'https://www.amazon.in/images/I/81bHhfshu6L._SX679_.jpg',
                    // images: news.imageUrl
               }
          }
          if(!hasNoNotifyDelimiter){
               admin.messaging().sendToTopic("news_new", payload)
               .then(function (response: any) {
                    console.log(response)
               })
               .catch(function (error: any) {
                    console.log(error)
               });
          }

     })

     exports.sendNotifications_new = functions.firestore.document('newstest/{messageId}').onCreate(
      async (snapshot: any) => {
           // Notification details.
           const news = snapshot.data();
           const hasNoNotifyDelimiter = news.title.substr(news.title.length-1) === " ";
           const payload = {
                notification: {
                     title: news.title,
                     body: truncate(news.content, 100).replace(/(<([^>]+)>)/ig, ""),
                     // icon: 'https://www.amazon.in/images/I/81bHhfshu6L._SX679_.jpg',
                     // images: news.imageUrl
                }
           }
           if(!hasNoNotifyDelimiter){
                admin.messaging().sendToTopic("news_test", payload)
                .then(function (response: any) {
                     console.log(response)
                })
                .catch(function (error: any) {
                     console.log(error)
                });
           }
 
      })