const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { 
    type: String,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  }
})

const Users = mongoose.model('user', user)

module.exports = Users
