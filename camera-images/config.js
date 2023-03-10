import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {

    apiKey: "AIzaSyD-9qy7LI_dtclDJCrCvf2DzHKuQkdK9cU",
    authDomain: "expoimage9000.firebaseapp.com",
    projectId: "expoimage9000",
    storageBucket: "expoimage9000.appspot.com",
    messagingSenderId: "816154353095",
    appId: "1:816154353095:web:9a13b85684e8010b044de2"

}


firebase.initializeApp(firebaseConfig);


export default firebase;