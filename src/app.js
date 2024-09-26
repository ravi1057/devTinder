const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  res.send("Hello User How are You");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "ravi", lastName: "parashanaboin" });
});

app.post("/user", (req, res) => {
  res.send("Data saved Successfully");
});

app.put("/user", (req, res) => {
  res.send("Data Updated Successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data Deleted Successfully");
});

app.use("/hello", (req, res) => {
  res.send("Hello World !!");
});

app.use("/test", (req, res) => {
  res.send("Hello From Server !!");
});

// app.use("/", (req, res) => {
//   res.send("Hello From  DashBoard !!");
// });

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
