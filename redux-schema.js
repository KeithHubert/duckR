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
        isOpen,
    },
    ducks: {
        isFetching,
        error,
        [duckID]: {
            lastUpdated,
            info: {
                avatar
                duckID
                name
                text 
                timestamp
                uid
            }
        }
    },
    usersDucks: {
        isFetching,
        error,
        [uid]: {
            lastUpdated,
            duckIds: [duckID, duckID, duckID]
        }
    },
    likeCount: {
        [duckId]: 0 
    },
    usersLikes: {
        [duckId]: true
    },
    replies: {
        isFetching,
        error,
        [duckId]: {
            replies: {
                lastUpdated,
                [replyId]: {
                    name
                    comment
                    uid
                    timestamp
                    avatar
                }
            }
        }
    },
    listeners: {
        [listenersId]: true
    },
    feed: {
        isFetching,
        error,
        newDucksAvailable,
        duckIdsToAdd: [duckId, duckId],
        duckIds: [duckId, duckId]
    },
}
