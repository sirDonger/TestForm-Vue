import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
  .initializeApp({ 
    apiKey: "AIzaSyD6kbgk3LPlZNWIR199PAUDg_0gb7Mkuns",
    authDomain: "testform-5f4a5.firebaseapp.com",
    databaseURL: "https://testform-5f4a5.firebaseio.com",
    projectId: "testform-5f4a5",
    storageBucket: "testform-5f4a5.appspot.com",
    messagingSenderId: "402931375662",
    appId: "1:402931375662:web:073bb17242c303974ec9bf",
    measurementId: "G-YJ17484FF5"
  }).firestore()


const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }


