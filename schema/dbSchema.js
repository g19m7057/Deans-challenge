const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email_address: { type: String, required: true },
});

const userDB = mongoose.model('users', userSchema);

module.exports = userDB;