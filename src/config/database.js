const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ravi1234:ravi1057@ravicluster.9odgvza.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
