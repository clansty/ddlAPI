const fs = require('fs')
const uuid = require('node-uuid');

// Store the schedules that are public on the server
const data = require('./data/ddls')

function add(body) {
    if(!body.name)
        return 406    
    body.id=uuid.v1()
    data.push(body)
    save()
    return 200
}

function modify(id, body) {
    const item = getById(id)
    if(item==null)
        return 404
    for(var key in body){
        if(key==id)
            continue
        item[key]=body[key]
    }
    save()
    return 200
}

function remove(id) {
    const fid = data.findIndex(item => item.id == id)
    if (fid == -1)
        return 404
    data.splice(fid, 1)
    save()
    return 200
}

function getById(id) {
    const fid = data.findIndex(item => item.id == id)
    if (fid == -1)
        return null
    return data[fid]
}

function getAll() {
    return data
}

function save() {
    fs.writeFile('./data/ddls.json', JSON.stringify(data), () => { })
}

module.exports = {
    add,
    remove,
    getById,
    getAll,
    modify
}