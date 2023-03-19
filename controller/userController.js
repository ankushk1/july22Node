const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // Check if user is already signedup
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already signed up/ Try signin" });
    }

    const encryptedPass = bcrypt.hashSync(req.body.password, saltRounds);
    // Create the user
    const userCreated = await User.create({
      ...req.body,
      password: encryptedPass
    });

    if (!userCreated) {
      return res.status(400).json({ message: "User creation failed" });
    }

    return res.status(200).json({ message: "User successfully created" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // User is signed up or not
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email/ Please Sign up first" });
    }

    // We want to match passwords
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { _id, firstname, lastname } = user;
    const token = jwt.sign({ _id, firstname, lastname }, "secret", {
      expiresIn: "5h"
    });
    res.status(200).json({ token, message: "Signin Successfull" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
