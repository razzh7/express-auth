const express = require('express')
const router = express.Router()
const Users = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = 'jklyf78s3@2askj#.fd$asd' // 应用密钥
const auth = require('../utils/auth')

// 查看所有用户
router.get('/findUsers', async(req, res) => {
  const users = await Users.find()
  return res.send(users)
})

// 注册用户
router.post('/register', async(req, res) => {
  const { username, password } = req.body
  await Users.create({
    username,
    password
  })
  return res.send({
    msg: '您已成功注册'
  })
})

// 登录
router.post('/login', async(req, res) => {
  const { username, password } = req.body
  const user = await Users.findOne({ username })
  if (!user) {
    return res.send({ msg: '不存在这个用户,请注册' }) // 不允许用户重名
  }

  const match = await bcrypt.compare(password, user.password) // 用户传来的密码和用户数据库中的密码比较
  if (match) {
    const token = jwt.sign({ // JWT加密
      id: user._id, // 对user唯一标实JWT加密
    }, SECRET, { expiresIn: 60 * 30 }) // 设置过期时间30min
    return res.send({
      msg: '登录成功',
      status: 200,
      token
    })
  } else {
    return res.send({
      msg: '登录失败',
      status: 402
    })
  }

})

// 个人信息
router.get('/user/profile', auth.verifyToken, async (req, res) => {
  const userId = req.verifyToken.id
  const userDetail = await Users.findById({ _id: userId })
  res.send(userDetail)
})



module.exports = router