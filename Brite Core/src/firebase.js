import {initializeApp} from 'firebase'



const app = initializeApp({
    apiKey: "AIzaSyDPAp22D1zOaN89sUqcVPXqSaJtTEdA1oc",
    authDomain: "britecore-b2dfb.firebaseapp.com",
    databaseURL: "https://britecore-b2dfb.firebaseio.com",
    projectId: "britecore-b2dfb",
    storageBucket: "britecore-b2dfb.appspot.com",
    messagingSenderId: "191446042063"
});

export const db = app.database()
export const usersRef = db.ref('users')
