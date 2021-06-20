import firebase from 'firebase';
import  'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4fdD8HnXNLUaaxLWAbc63Uu4wsIc1PBY",
  authDomain: "olx-clone-71113.firebaseapp.com",
  projectId: "olx-clone-71113",
  storageBucket: "olx-clone-71113.appspot.com",
  messagingSenderId: "1096937733716",
  appId: "1:1096937733716:web:6fa484d6fe5bfd578077c1",
  measurementId: "G-SGR44XQ52L"
};
 export default  firebase.initializeApp(firebaseConfig)