const express = require('express')
require('./database/db')
const router = require('./router/user')
const app = express()

app.use(express.json())
app.use(router)

app.get('/', (res, req) => {
  req.send('Hello World')
})

app.listen(6001, () => {
  console.log('6001端口已启动！')
})