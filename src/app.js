const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello From  DashBoard !!");
});

app.use("/hello", (req, res) => {
  res.send("Hello World !!");
});

app.use("/test", (req, res) => {
  res.send("Hello From Server !!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
