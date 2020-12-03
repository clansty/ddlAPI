// this file provides auth service for the api

const fs = require('fs')

const uuid = require('node-uuid');
const users = require('./data/users')

const defaultAuth = 1

function authVerify(req, res, next) {
    if (!req.headers['x-auth']) {
        res.status(401).send({
            code: 401,
            msg: "Unauthorized"
        })
        return
    }
    var u = getUserByToken(req.headers['x-auth'])
    if (!u || !u.auth) {
        res.status(403).send({
            code: 403,
            msg: "Forbidden"
        })
        return
    }
    next()
}

function getUserByToken(token) {
    return users[users.findIndex(item => item.token == token)]
}

function getUserById(uid) {
    return users[users.findIndex(item => item.uid == uid)]
}

function resetUserToken(uid) {
    var user = getUserById(uid)
    if (user == null) {
        user = {
            uid,
            auth: defaultAuth
        }
        users.push(user)
    }
    const newToken = uuid.v4()
    user.token = newToken
    save()
    return newToken
}

function save() {
    fs.writeFile('./data/users.json', JSON.stringify(users), () => { })
}

module.exports = {
    authVerify,
    getUserByToken,
    resetUserToken,
    user: 1,
    bot: 3
}