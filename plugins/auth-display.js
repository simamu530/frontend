import * as firebase from 'firebase/app';
import firebaseConfig from 'plugins/firebase.js';

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult(true).then((idTokenResult) => {
      if (idTokenResult.claims.admin) {
        // current user has admin
        //4/16　おそらくここに管理者権限が使用できる機能を追記
      }
      else {
        //ここにログイン済みユーザーが使用できる機能を追記
      }
    });
  } else {
    //未登録もしくは未ログインユーザーが使用できる機能を追記
  }
});