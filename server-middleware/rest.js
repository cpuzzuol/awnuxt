const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.all('/getJSON', (req, res) => {
  const dept = parseInt(req.query.dept)
  const supportedDepts = [216000, 216001, 216002]
  let data = {
    supported: supportedDepts.includes(dept)
  }

  res.json({ data: data })
})

module.exports = app
