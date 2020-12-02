const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const dataStore=require('./jsonDataStore')
const auth=require('./auth')

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to ddl manager API!')
})

app.use(auth.authVerify)//the methods below need auth

app.get('/api/all', (req, res)=>{
  res.send(dataStore.getAll())
})

app.get('/api/item/:id', (req, res)=>{
  const result=dataStore.getById(req.params.id)
  if(result==null){
    res.status(404).send({ code: 404 })
    return
  }
  res.send(result)
})

app.delete('/api/item/:id', (req, res)=>{
  var result = dataStore.remove(req.params.id)
  res.status(result).send({ code: result })
})

app.post('/api/add', jsonParser, (req, res)=>{
  var result = dataStore.add(req.body)
  res.status(result).send({ code: result })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})