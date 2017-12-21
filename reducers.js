// Object.assign is required to return new object, not change state
// Object.spread (...state) is new hotness, requires babel

// _______________________
// return {
//     ...state,
//     isAuthed: true,
//     authedId: action.uid,
// }

// is equal to 

// return Object.assign({}, state, {
//     isAuthed: true,
//     authedId: action.uid,
// })
// _______________________



// Users

// Video 6 9:45, reducer created for USER_SUCCESS case in users()
// Was this

// case FETCHING_USER_SUCCESS : {
//     return action.user === null
//         ? {
//             ...state,
//             error: '',
//             isFetching: false,
//         }
//         : {
//             ...state,
//             isFetching: false,
//             error: '',
//             [action.uid]: {
//                 info: action.user,
//                 lastUpdated: action.timestamp,
//             }

//         }
    
// }
// ________

// [action.uid]: {
//     info: action.user,
//     lastUpdated: action.timestamp,

// is equal to 

// [action.uid]: user(state[action.uid], action)
// ________


// USER REDUCERS

const initialUserState = {
    lastUpdated: 0,
    info: {
        name: '',
        uid: '',
        avatar: '',
    }
}

function user (state = initialUserState , action) {
    switch (action.type) {
        case FETCHING_USER_SUCCESS :
            return {
                ...state,
                info: action.user,
                lastUpdated: action.timestamp,
            }
        default :
            return state
    }
}

const initialState = {
    isFetching: false,
    error: '',
    isAuthed: false,
    authedId: ''
}

function users (state = initialState, action) {
    switch (action.type) {
        case AUTH_USER :
            return {
                ...state,
                isAuthed: true,
                authedId: action.uid,
            }
        case UNAUTH_USER :
            return {
                ...state,
                isAuthed: false,
                authedId: '',
            }
        case FETCHING_USER :
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_USER_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        case FETCHING_USER_SUCCESS:
        return action.user === null
            ? {
                ...state,
                isFetching: false,
                error: '',
            }
            : {
                ...state,
                isFetching: false,
                error: '',
                [action.uid]: user(state[action.uid], action),
            }
        default :
            return state
    }
}

// DUCKS REDUCER

const initialState = {
    isFetching: true,
    error: ''
}

function ducks (state, action) {
    switch (action.type) {
        case FETCHING_DUCK :
            return {
                ...state,
                isFetching: true,
            }
        case ADD_DUCK :
        case FETCHING_DUCK_SUCCESS :
            return {
                ...state,
                error: '',
                isFetching: false,
                [action.duck.duckId]: action.duck,
            }
        case FETCHING_DUCK_ERROR :
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        case REMOVE_FETCHING :
            return {
                ...state,
                isFetching: false,
                error: '',
            }
        case ADD_MULTIPLE_DUCKS :
            return {
                ...state,
                ...action.ducks,
            }
        default :
            return state
    }

}

// FEEDS REDUCER

const initialState = {
    isFetching: false,
    newDucksAvailable: false,
    newDucksToAdd: [],
    error: '',
    duckIds: [],
}

function feed (state, action) {
    switch (action.type) {
        case SETTING_FEED_LISTENER : 
            return {
                ...state,
                isFetching: true,
            }
        case SETTING_FEED_LISTENER_ERROR :
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        case SETTING_FEED_LISTENER_SUCCESS :
            return {
                ...state,
                isFetching: false,
                error: '',
                duckIds: action.duckIds,
                newDucksAvailable: false,
            }
        case ADD_NEW_DUCK_ID_TO_FEED :
            //Return brand new array using mixing in new duck ID to newDucksToAdd array
            return {
                ...state,
                newDucksToAdd: [action.duckId, ...state.newDucksToAdd]
            }
        case RESET_NEW_DUCKS_AVAILABLE :
            //Take all ducks from newDucksToAdd, add them to duckIds with all the old ones as well (news feed)
            return {
                ...state,
                duckIds: [...state.newDucksToAdd, ...state.duckIds],
                newDucksToAdd: [],
                newDucksAvailable: false,
            }
        default :
            return state
    }
}

//Listeners 

export default function listeners (state = {}, action) {
    switch (action.type) {
        case ADD_LISTENER :
            return {
                ...state,
                [action.listenerId] : true,
            }
        default :
            return state
    }
}

//MODAL

const initialState = {
    duckText: '',
    isOpen: false,
}

export default function modal (state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL :
            return {
                ...state,
                isOpen: true,
            }
        case CLOSE_MODAL :
            return {
                duckText: '',
                isOpen: false, 
            }
        case UPDATE_DUCK_TEXT:
            return {
                ...state,
                duckText: action.newDuckText,
            }
        default :
            return state
    }
}

//usersLikes

const initialState = {
    isFetching: false,
    error: '',
}

export default function usersLikes (state = initialState, action) {
    switch (action.type) {
        case FETCHING_LIKES :
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_LIKES_ERROR :
            return {
                ...state,
                isFetching: false,
                error: action.error, 
            }
        case FETCHING_LIKES_SUCCESS:
        //old state with new likes added on to it
            return {
                ...state,
                ...action.likes,
                isFetching: false,
                error: '',
            }
        case ADD_LIKE:
            return {
                [action.duckId]: true,
            }
        case REMOVE_LIKE:
        // Remove a specific item from an object (duckId from an object...) 9:30 video 6 pt.2
        // Loop over every duckId in state
        // Filter out every duckId that matches the duckId we receive from the action, returns array with specific duckId removed
        // We don't want state to be an array we want an object so we reduce into in object, then return it
            return Object.keys(state)
                .filter((duckId) => action.duckId !== duckId)
                .reduce((prev, current) => {
                    prev[current] = state[current]
                    return prev
                }, {})
        default :
            return state
    }
}

//likeCount

//12:20, recap at 14:10 line 364

// ADD_LIKE and REMOVE_LIKE: defined in usersLikes reducer, imported into likeCount reducer 
// because every action triggers each reducer so they see eachother

// Check to see if duckId has already been fetched = (typeof state[action.duckId] === 'undefined') 
// If it has, modify it. New state returned is whatever state was but duckId will modify it's own count using 
// count reducer (+1 / -1, 

const initialState = {
    isFetching: false,
    error: '',
}

function count (state = 0, action) {
    switch (action.type) {
        case ADD_LIKE :
            return state + 1
        case REMOVE_LIKE :
            return state - 1
        default :
            return state
    }
}

export default function likeCount (state = initialState, action) {
    switch (action.type) {
        case FETCHING_COUNT :
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_COUNT_ERROR :
            return {
                ...state,
                isFetching: false,
                error: action.error, 
            }
        case FETCHING_COUNT_SUCCESS : 
        //Trick mixing in initialState so instead of putting in (isFectchingState: false, and error: '',)
            return {
                ...state,
                ...initialState,
                [action.duckId]: action.count,
            }
        case ADD_LIKE :
        case REMOVE_LIKE :
            return typeof state[action.duckId] === 'undefined'
                ? state
                : {
                    ...state,
                    [action.duckId]: count(state[action.duckId], action)
                }
        default :
            return state
    }
}

// usersDucks
// Video 6 pt. 2 15:40

const initialUsersDuckState = {
    lastUpdated: 0,
    duckIds: [],
  }
  
  function usersDuck (state = initialUsersDuckState, action) {
    switch (action.type) {
      case ADD_SINGLE_USERS_DUCK :
        return {
          ...state,
          duckIds: state.duckIds.concat([action.duckId]),
        }
      default :
        return state
    }
  }

  const initialState = {
    isFetching: true,
    error: '',
  }
  
  export default function usersDucks (state = initialState, action) {
    switch (action.type) {
      case FETCHING_USERS_DUCKS :
        return {
          ...state,
          isFetching: true,
        }
      case FETCHING_USERS_DUCKS_ERROR :
        return {
          ...state,
          isFetching: false,
          error: action.error,
        }
      case FETCHING_USERS_DUCKS_SUCCESS :
        return {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: {
            lastUpdated: action.lastUpdated,
            duckIds: action.duckIds,
          },
        }
      case ADD_SINGLE_USERS_DUCK :
        return typeof state[action.uid] === 'undefined'
          ? state
          : {
            ...state,
            isFetching: false,
            error: '',
            [action.uid]: usersDuck(state[action.uid], action),
          }
      default :
        return state
    }
  }
  
//Replies 
// 17:20, most complex reducer

//Replies
const initialReply = {
    name: '',
    reply: '',
    uid: '',
    timestamp: 0,
    avatar: '',
    replyId: '',
  }
  
  function duckReplies (state = initialReply, action) {
    switch (action.type) {
      case ADD_REPLY :
      //Slice of state containing only .replies. Set new key value pair, Reply id: Reply
        return {
          ...state,
          [action.reply.replyId]: action.reply,
        }
      case REMOVE_REPLY :
        return {
          ...state,
          [action.reply.replyId]: undefined,
        }
      default :
        return state
    }
  }
  
  const initialDuckState = {
    lastUpdated: Date.now(),
    replies: {},
  }
  
  function repliesAndLastUpated (state = initialDuckState, action) {
    switch (action.type) {
      case FETCHING_REPLIES_SUCCESS :
        return {
          ...state,
          lastUpdated: action.lastUpdated,
          replies: action.replies,
        }
      case ADD_REPLY :
      case REMOVE_REPLY :
        //More nested data, make duckReplies reducer
        return {
          ...state,
          replies: duckReplies(state.replies, action),
        }
      default :
        return state
    }
  }
  
  const initialState = {
    isFetching: true,
    error: '',
  }
  
  export default function replies (state = initialState, action) {
    switch (action.type) {
      case FETCHING_REPLIES :
        return {
          ...state,
          isFetching: true,
        }
      case FETCHING_REPLIES_ERROR :
      case ADD_REPLY_ERROR :
        return {
          ...state,
          isFetching: false,
          error: action.error,
        }
      case ADD_REPLY :
      case FETCHING_REPLIES_SUCCESS :
      case REMOVE_REPLY :
      //because data is nested, best to deal with it using another reducer (repliesAndLastUpdated)
        return {
          ...state,
          isFetching: false,
          error: '',
          [action.duckId]: repliesAndLastUpated(state[action.duckId], action),
        }
      default :
        return state
    }
  }

