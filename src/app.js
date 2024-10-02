const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //Create a new instance of user model

  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added Succesfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data,{runValidators: true});
    res.send("User updated Successfully!");
  } catch (err) {
    res.status(400).send("Update User Failed:"+err.message);
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
    res.status(400).send("Update User Email Failed:"+err.message);
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
