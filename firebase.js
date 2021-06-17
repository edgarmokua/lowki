import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDF5xAOe-yErrEh2bmrj10HoRHImqVDV_w",
    authDomain: "lowki-254.firebaseapp.com",
    projectId: "lowki-254",
    storageBucket: "lowki-254.appspot.com",
    messagingSenderId: "1004768482701",
    appId: "1:1004768482701:web:2c2a9503229b10061159c4",
    measurementId: "G-C8CJHN6Q5H"
  };

let app;
if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };