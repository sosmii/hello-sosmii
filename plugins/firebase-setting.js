import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const appInstance = firebase.initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
})

const firestore = appInstance.firestore()
firestore.settings({
  timestampsInSnapshots: true
})

export { firestore }
export const fireAuth = appInstance.auth()
export const fireFunc = appInstance.functions()
export const githubAuthProvider = new firebase.auth.GithubAuthProvider()
