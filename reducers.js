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