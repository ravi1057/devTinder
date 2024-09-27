const express = require("express");

const app = express();

//Handle auth middleware for all GET,POST Requesrs

const { adminAuth, userAuth } = require("./middlewares/auth.js");

app.use("/admin", adminAuth);
// app.use("/user", userAuth);
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/user", userAuth, (req, res) => {

  throw new Error("orwqjrqpwirwper")
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Send All Data");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
