import * as firebase from 'firebase/app';
import firebaseConfig from 'plugins/firebase.js';

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult(true).then((idTokenResult) => {
      if (idTokenResult.claims.admin) {
        // current user has admin
      }
    });
  }
});