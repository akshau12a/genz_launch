// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contactNo: String, // ✅ Add this line
});

module.exports = mongoose.model('User', userSchema);
