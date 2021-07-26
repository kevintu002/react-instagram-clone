import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCegKCvUvanArjG1hIIUX_Ne6Wv693TM0I",
  authDomain: "react-instagram-clone-11dd6.firebaseapp.com",
  projectId: "react-instagram-clone-11dd6",
  storageBucket: "react-instagram-clone-11dd6.appspot.com",
  messagingSenderId: "288355249052",
  appId: "1:288355249052:web:c3431af348bb339ad3f659",
  measurementId: "G-Q6BWQ7280J"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
