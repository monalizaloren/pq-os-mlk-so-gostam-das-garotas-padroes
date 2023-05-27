import firebase from 'firebase'

require ('@firebase/firestore')
const firebaseConfig = {
    apiKey: "AIzaSyDAyibgHNjQCghZCe4nt1k1G-RJGbm-Fdo",
    authDomain: "puci-tai.firebaseapp.com",
    projectId: "puci-tai",
    storageBucket: "puci-tai.appspot.com",
    messagingSenderId: "816735924240",
    appId: "1:816735924240:web:9eac35b6dce730d59dda95"
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore ()