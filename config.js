import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqwH9QByZEQWCmFa5wjBbp268C35cKDqg",
    authDomain: "address-4fa9e.firebaseapp.com",
    projectId: "address-4fa9e",
    storageBucket: "address-4fa9e.appspot.com",
    messagingSenderId: "14120204432",
    appId: "1:14120204432:web:165693e5f8e5fb0fca4015",
    measurementId: "G-L95NNC53V9"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };