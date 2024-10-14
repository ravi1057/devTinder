const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const { validateSingUpData } = require("./utils/validation.js");
const { userAuth } = require("./middlewares/auth.js");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

// Get user profile

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending Connection Request!!");
  res.send(user.firstName + " User with FirstName");
});

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection not established");
  });
