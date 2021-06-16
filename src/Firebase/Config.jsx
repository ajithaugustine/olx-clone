import firebase from 'firebase';
import  'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzUHim2P4Qp3d1jb7VjY5BVQpXcmPpMGA",
    authDomain: "olxdemo-01.firebaseapp.com",
    projectId: "olxdemo-01",
    storageBucket: "olxdemo-01.appspot.com",
    messagingSenderId: "872484409841",
    appId: "1:872484409841:web:aadde06f14de209bc7f450",
    measurementId: "G-S8BL5E4PLP"
  };
 export default  firebase.initializeApp(firebaseConfig)