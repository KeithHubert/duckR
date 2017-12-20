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