import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDKrJj2I8V7LRmlfySYrhZyO30OhVmso0Q",
    authDomain: "daily-moments-23ff2.firebaseapp.com",
    databaseURL: "https://daily-moments-23ff2.firebaseio.com",
    projectId: "daily-moments-23ff2",
    storageBucket: "daily-moments-23ff2.appspot.com",
    messagingSenderId: "149637179187",
    appId: "1:149637179187:web:86c5de45b1c0578b73c046"
  };

  const app = firebase.initializeApp(firebaseConfig);
  export const auth = app.auth();