const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin:Boolean,
    downloads:[{file:String,ipLoc:Object,ip:String}]
  })
);

module.exports = User;
