const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken.js");
const jwt = require("json-web-token");
const bcrypt = require("bcrypt");

// users Registration

const user_register = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required .!!");
  }

  const existed_user = await User.findOne({ email });

  if (existed_user) {
    res.status(400);
    throw new Error("User is already existed...");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic || "",
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

//User Login

const user_login = asyncHandler(async (req, res) => { 
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("all field are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(" user is dosenot exist !");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      pic:user.pic,
      token:generateToken(user._id),
    });
  }else{
    res.status(401);
    throw new Error("Invalid Email or password");   
  } 
});

// /api/user?search=Piyush

const alluser = asyncHandler(async (req, res) => {
  // $regex (its helps us to match the string & help to filter them )
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //this will find all of the searched result expect the user which logedin !! $ne (not equalto)
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { user_register, user_login, alluser };
