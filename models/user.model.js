const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },

});

module.exports = mongoose.model('User', UserSchema);
