const express = require("express");
const { validateSingUpData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validateSingUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);

    //Create a new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send("User added Succesfully!");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentails");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create JWT Token
      const token = await user.getJWT();

      //Add the token to cookie and send the response back to the user

      res.cookie("token", token);
      res.send("Loin Successful");
    } else {
      throw new Error("Invalid Credentails");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = authRouter;
