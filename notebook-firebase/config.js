// dependencies
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// config
const firebaseConfig = {
    apiKey: "AIzaSyAQsMj3KKdMtBkbQwq5ap0zCeXTnwqQAz0",
    authDomain: "notebook-firebase-d38b4.firebaseapp.com",
    projectId: "notebook-firebase-d38b4",
    storageBucket: "notebook-firebase-d38b4.appspot.com",
    messagingSenderId: "1010197087031",
    appId: "1:1010197087031:web:e3ab82f1cf4608c01750b2",
    measurementId: "G-0YC2H5Z6TH"
}

// init
firebase.initializeApp(firebaseConfig);


// export
export default firebase;