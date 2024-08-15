const { Router } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const check = await userModel.findOne({ email });

    if (check) {
      return res.status(400).json({ message: "This email is already registered, try to login" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(500).json({ message: "Error hashing password" });

      const user = new userModel({
        username,
        email,
        password: hash,
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});



userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    // console.log(password,user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {email}

    jwt.sign(payload,process.env.SECRET_KEY,(err,token)=>{
      if(err)console.log(err);
      console.log(token);
      res.status(200).json({token:token});
    })

    // res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/logout", (req, res) => {
  // Implement logout logic here, like clearing session or JWT token
  res.status(200).json({ message: "Logout successful" });
});

module.exports = userRouter;
