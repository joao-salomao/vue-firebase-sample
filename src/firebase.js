import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCqJRdo_wK4UOSXAihGsQmTNOqgadvce-8",
    authDomain: "vue-serveless.firebaseapp.com",
    databaseURL: "https://vue-serveless.firebaseio.com",
    projectId: "vue-serveless",
    storageBucket: "vue-serveless.appspot.com",
    messagingSenderId: "592414406362",
    appId: "1:592414406362:web:aa72f30b33e0ca8f9217e3",
    measurementId: "G-Z18X6KYWXK"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

export {
    firestore,
    auth
}