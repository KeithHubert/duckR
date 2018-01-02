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

// listen to 'ducks' endpoint, on the event of a change run function with snapshot
export function listenToFeed (cb, errorCB) {
  ref.child('ducks').on('value', (spanshot) => {
    const feed = snapshot.val() || {}
    // sort entire feed, give back IDs sorted by timestamp
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timesptamp = feed[a].timestamp
    })
    // return feed
    cb({feed, sortedIds})
  }, errorCB)
}
