What's the minimal representation of our app state as an object? 


Brought in established schema from firebase-schema:
"Hello World version, misses important UI elements"

// {
//     users: {
//         [uid]: {
//             info: {
//                 name,
//                 uid,
//                 avatar,
//             }
//         }
//     }
//     ducks: {
//         [duckID]: {
//             info: {
//                 avatar
//                 duckID
//                 name
//                 text 
//                 timestamp
//                 uid
//             }
//         }
//     },
//     usersDucks: {
//         [uid]: {
//             duckIds: [duckID, duckID, duckID]
//         }
//     },
//     likeCount: {
//         [duckId]: 0 
//     },
//     usersLikes: {
//         [duckId]: true
//     },
//     replies: {
//         [duckId]: {
//             replies: {
//                 [replyId]: {
//                     name
//                     comment
//                     uid
//                     timestamp
//                     avatar
//                 }
//             }
//         }
//     }
// }

Above but with UI and error logic:

{
    users: {
      isAuthed,
      isFetching,
      error,
      authedId,
      [uid]: {
        lastUpdated,
        info: {
          name,
          uid,
          avatar,
        }
      }
    },
    modal: {
      duck,
      isOpen
    },
    ducks: {
      [duckId]: {
        lastUpdated,
        info: {
          avatar,
          duckId,
          name,
          text,
          timestamp,
          uid,
        }
      }
    },
    likeCount: {
      [duckId]: 0
    },
    usersDucks: {
      isFetching,
      error,
      [uid]: {
        lastUpdated,
        duckIds: [duckId, duckId, duckId]
      }
    },
    usersLikes: {
      duckid: true,
    }
    feed: {
      isFetching,
      error,
      newDucksAvailable,
      duckIdsToAdd: [duckId, duckId],
      duckIds: [duckid, duckId, duckId]
    }
    replies: {
      isFetching,
      error,
      [duckId]: {
        lastUpdated,
        replies: {
          [replyId]: {
            name,
            reply,
            uid,
            timestamp,
            avatar
          }
        }
      }
    },
    listeners: {
      [listenerId]: true
    }
  }