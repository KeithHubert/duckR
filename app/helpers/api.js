import { ref } from 'config/constants'

function saveToDucks (duck) {
  // Pushes new data to Firebase, creates random duckId
  const duckId = ref.child('ducks').push().key
  // Creates new object which has all the properties of duck and adds the duck Id.
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  return {
    duckId,
    duckPromise,
  }
}

function saveUsersDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likecount/${duckId}`).set(0)
}

// encaps all our invocations to the above async functions
export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveUsersDucks(duck, duckId),
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (cb, errorCb) {
  let timesCalled = 0
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    
    let initialFetch = timesCalled++ <= 0
    cb({feed, sortedIds}, initialFetch)
  }, errorCb)
}

// // listen to 'ducks' endpoint, on the event of a change run function with snapshot
// export function listenToFeed (cb, errorCB) {
//   ref.child('ducks').on('value', (snapshot) => {
//     const feed = snapshot.val() || {}
//     // sort entire feed, give back IDs sorted by timestamp
//     const sortedIds = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp)
//     cb({feed, sortedIds})
//     // return feed
//   }, errorCB)
// }

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUsersDucks (uid) {
  return ref.child(`usersDucks/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}
