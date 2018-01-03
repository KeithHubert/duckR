import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBSPOl3TBthU6mUS6BiwA5t1lD3BIcI6iQ',
  authDomain: 'dukr-1beb8.firebaseapp.com',
  databaseURL: 'https://dukr-1beb8.firebaseio.com',
  projectId: 'dukr-1beb8',
  storageBucket: 'dukr-1beb8.appspot.com',
  messagingSenderId: '896429295441',
}
firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
