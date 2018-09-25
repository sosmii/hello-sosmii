import firebase from 'firebase' // TODO: 確かこれだと個別にインストールしろって警告出なかったっけ？
// TODO: これ要る？
// import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID
})

const firestore = firebaseApp.firestore()
firestore.settings({
  timestampsInSnapshots: true
})

// TODO: Appって外側で使うっけ？
// export { firebaseApp }
export { firestore }
export const githubAuthProvider = new firebase.auth.GithubAuthProvider()
