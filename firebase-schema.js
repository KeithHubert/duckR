No Perfect
    -Tradeoffs
Keep Shallow
Repeat Data is OK

Here are the views we need:

Home
    All Ducks

Profile
    User Info
    Users Ducks

Replies 
    Specific Duck
    Ducks Replies

Mapping out schemas: the following don't work:

/users
    uid
        ducks
            duckID
                replies
                    replyID
                        uid
                        name
                        comment
                        etc
                info
                    uid
                    avatar
                    text
                    numberOfLikes
                    etc
        likes
            duckID

_____________________________________

/ducks
    duckID 
        replies
            replyID
                name
                comment
                etc
        info
            avatar
            text
            etc
        likes
            uid

Instead repeat data, it's ok!

/users
    uid
        info
    ducks
        duckID
            replies
            info
            usersWhoHaveLiked
    likes
        duckID
    
/ducks
    duckID 
        replies
        info  (instead of listing out name, uid, avatar etc)
            
Almost there! Not shallow enough, final schema:

_____________________________________

/users
    uid
        name
        uid
        avatar

/ducks
    duckID
        avatar
        duckID
        name
        text
        timestamp
        uid

/likeCount ( could be in usersDucks, or ducks, but then would have to maintain synched state in both)
    duckID

/usersDucks
    uid
        avatar
        duckID
        name
        text
        timestamp
        uid

/replies
    duckID 
        replyID
            name
            comment
            uid
            timestamp
            avatar

/usersLikes
    uid
        duckID