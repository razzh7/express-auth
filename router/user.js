const express = require('express')
const router = express.Router()
const Users = require('../model/user')

router.post('/register', async(res, req) => {
  const { username, password } = res.body
  console.log('user',username)
  await Users.create({
    username,
    password
  })
  req.send(await Users.find())
})

module.exports = router