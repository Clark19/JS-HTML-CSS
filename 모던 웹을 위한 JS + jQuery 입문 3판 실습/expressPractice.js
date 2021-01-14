const express = require('../LearningJS/node_modules/express')
const app = express()

const items = [
  { name: '우유', price: '2000' },
  { name: '홍차', price: '5000' },
  { name: '커피', price: '5000' },
]
app.use(express.static('public'))

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

app.listen(52273, () => {
  console.log('Server Running at 52273')
})
