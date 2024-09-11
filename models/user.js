
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: [true, 'User Name is mandatory field']
  },
  userEmail: {
    type: String,
    trim: true,
    unique:true,
    required: [true, 'User Email is mandatory field']
  },
  userPassword: {
    type: String,
    trim: true,
    required: [true, 'User Password is mandatory field']
  },
  createDate: {
    type: Date
  },
});

const User = mongoose.model("Users", UserSchema);

module.exports = { User };
