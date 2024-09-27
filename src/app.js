const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res, next) => {
    //Route Handler
    console.log("Handling Route user 1!!");
    next()
    // res.send("Route Handler 1");
  },
  (req, res, next) => {
    console.log("Route Handler user2!!!");
    // res.send("2nd Response");
    next();
  },
  (req,res,next) => {
    console.log("Route Handler user3!!!");
    // res.send("3nd Response");
    next()
  },
  (req,res,next) => {
    console.log("Route Handler user4!!!");
    // res.send("4nd Response");
    next()
  },
  (req,res,next) => {
    console.log("Route Handler user5!!!");
    res.send("5th Response");
    // next()
  }

);

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
