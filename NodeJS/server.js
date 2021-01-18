const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs')

// 서버
const app = express()
// 미들웨어를 설정합니다.
app.use(morgan('combined'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

const PORT = 8080;
const HOST = 'localhost';
let items = [
  { name: '우유', price: '2000' },
  { name: '홍차', price: '5000' },
  { name: '커피', price: '5000' },
]


app.get('/data.html', (req, res) => {
  let html = ''
  html += '<body>'
  items.forEach((item) => {
    html += '<div>'
    html += ' <h1>' + item.name + '</h1>'
    html += ' <h2>' + item.price + '</h2>'
    html += '</div>'
  })
  html += '</body>'
  res.send(html)
})

app.get('/data.json', (req, res) => {
  res.send(items)
})

app.get('/data.xml', (req, res) => {
  let output = ''
  output += '<?xml version="1.0" encoding="UTF-8" ?>'
  output += '<products>'
  items.forEach((item) => {
    output += '<product>'
    output += ' <name>' + item.name + '</name>'
    output += ' <price>' + item.price + '</price>'
    output += '</product>'
  })
  output += '</products>'
  res.type('text/xml')
  // res.set('Content-Type', 'text/xml')
  res.send(output)
})

app.get('/data/:id', (req, res)=> {
  const id = req.params.id
  res.send(items[id])
})

app.get('', (req, res)=> {
  fs.readFile('NodeJS/public/index.html', 'utf8', (err, data)=>{
    res.send(data.toString())
  })
  
})

app.post('/data', (req, res)=> { 
  const body = req.body
  if (!body.name) return res.send('name를보내주세요')
  items.push({name:body.name, price:body.price})
  res.send(items.slice(items.length-1, items.length))
})

app.put('/data/:id', (req, res)=> {
  const id = req.params.id
  console.log(id)
  if (req.body.name) items[id].name = req.body.name
  if (req.body.price) items[id].price = req.body.price
  res.send(items[id])
})

app.delete('/data/:id', (req, res)=> {
  const id = req.params.id
  delete items[id]
  res.send(items)
})

app.listen(PORT, HOST, () => {
  console.log(`Server Running at http://${HOST}:${PORT}`)
})
