import firebase from  "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBcfoD_MdtlPEKk7pPg3Qgz93T-5o0kqUA",
  authDomain: "writingfile-c5e35.firebaseapp.com",
  databaseURL: "https://writingfile-c5e35-default-rtdb.firebaseio.com",
  projectId: "writingfile-c5e35",
  storageBucket: "writingfile-c5e35.appspot.com",
  messagingSenderId: "54590547900",
  appId: "1:54590547900:web:b8d500678143907c13adb9",
  measurementId: "G-SEZH429YDZ"
};

export const fb = firebase.initializeApp(firebaseConfig);
export const fbStorage = firebase.storage();
export const db = firebase.database();
