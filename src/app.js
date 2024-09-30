const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

app.use(express.json())
app.post("/signup", async (req, res) => {
  //Create a new instance of user model
  // console.log(req.body)
    const user = new User(req.body);
  try {
    await user.save();
    res.send("User added Succesfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection establieshed successfully");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection not established");
  });
