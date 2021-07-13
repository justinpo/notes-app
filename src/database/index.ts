import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyBeayl1AY23F3QP8La74rHGHaRuuRi_STg",
  authDomain: "notes-app-abc4d.firebaseapp.com",
  projectId: "notes-app-abc4d",
  storageBucket: "notes-app-abc4d.appspot.com",
  messagingSenderId: "669757762702",
  appId: "1:669757762702:web:af4bf49e706c35f22b6ddf"
})

const firestore = firebase.firestore()

export default firestore
