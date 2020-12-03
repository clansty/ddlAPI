// this file provides auth service for the api

const users=require('./data/users')

function authVerify(req, res, next){
    if(!req.headers['x-auth']){
        res.status(401).send("Unauthorized")
        return
    }
    var u=getUserByToken(req.headers['x-auth'])
    if (!u || !u.auth){
        res.status(403).send("Forbidden")
        return
    }
    next()
}

function getUserByToken(token){
    return users[users.findIndex(item => item.token == token)]
}

module.exports={
    authVerify,
    getUserByToken
}