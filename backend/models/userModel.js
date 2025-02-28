const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema} = require('mongoose')

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    pic: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/07/14/98/00/240_F_714980039_hAEcSHo8GTyEANsEgwSuJc7LsPLy5NK8.jpg",
    },
  },
  {
    Timestamp: true,
  }
);

userModel.pre('save', async function (next){
  if(!this.modified){
    next()
  }
  this.password = await bcrypt.hash(this.password,10)
})


const User = mongoose.model("User",userModel);

module.exports = User;