const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//Route-1: Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking if email already exist in database
    let user = await User.findOne({ email });
    if (user) {
      res
        .send({
          status: "failure",
          message: "This email already exist.",
        })
        .status(400);
    } else {
      //generating the hash of the password
      const hash = await bcrypt.hash(password, 10);
      //creating new user
      user = await User.create({
        name,
        email,
        password: hash,
      });

      res.status(201).send({
        status: "success",
        message: "User registered successfully",
      });
    }
  } catch (error) {
    return res
      .json({
        status: "failure",
        message: error.message,
      })
      .status(500);
  }
});

//Route-3: Logging in a existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .json({
          status: "failure",
          message: "user does not exist, please register",
        })
        .status(400);
    }

    //checking if password and hash matches
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res
        .json({
          status: "failure",
          message: "username and password does not match!",
        })
        .status(401);
    }
    //generating a token
    const token = jwt.sign(
      {
        data: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      status: "success",
      message: "successfully logged in.",
      id: user._id,
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
});

module.exports = router;
