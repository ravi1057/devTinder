const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const { validateSingUpData } = require("./utils/validation.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validateSingUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword, "===>hashPassword");

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Loin Successful");
    } else {
      throw new Error("Invalid Credentails");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Get user by Id

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//  Get user by email

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//  Feed API - GET /feed  -get all the users from database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// delete a user from database

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({ _id: userId });
    const user = await User.findByIdAndDelete(userId); //Both are same
    res.send("User deleted Successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update a user from database

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "age",
      "skills",
      "gender",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skill canot be more that 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated Successfully!");
  } catch (err) {
    res.status(400).send("Update User Failed:" + err.message);
  }
});

//Update a user with emailId

app.patch("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ emailId: userEmail }, data);
    res.send("User updated with email Successfully!!");
  } catch (err) {
    res.status(400).send("Update User Email Failed:" + err.message);
  }
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
