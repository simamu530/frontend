import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDcvMYHVcO-zjbdsclIEnIGnAfFQ4ay68o",
      authDomain: "prosettinglist.firebaseapp.com",
      projectId: "prosettinglist",
      storageBucket: "prosettinglist.appspot.com",
      messagingSenderId: "878411826876",
      appId: "1:878411826876:web:904d21e0c45e3b9f50f2b9",
      measurementId: "G-M0W1HY4SWF"
    }
  )
}
  
export const auth = firebase.auth
export default firebase