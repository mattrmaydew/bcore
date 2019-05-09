import firebase from '@firebase/app';
import 'firebase/firestore'
import 'firebase/firebase-auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD5_KN1NByTweXxaPCimYTL_4oV9c8DCRs",
    authDomain: "vue-vuex-firebase-6fb8c.firebaseapp.com",
    databaseURL: "https://vue-vuex-firebase-6fb8c.firebaseio.com",
    projectId: "vue-vuex-firebase-6fb8c",
    storageBucket: "vue-vuex-firebase-6fb8c.appspot.com",
    messagingSenderId: "812183633184"
  };
  const fb = firebase.initializeApp(config);
  const db = firebase.firestore();


  export {fb,db}