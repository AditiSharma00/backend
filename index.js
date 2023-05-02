const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
// app.use(cors())
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const connection = async () => {
  try {
    await mongoose.createConnection(process.env.mongo_url);
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
};
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.listen(8080, () => {
  connection();
  console.log("listening on 8080");
});
