const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const app = express();
const User = require("./Models/User.js");
app.use(express.json());
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
mongoose.connect(process.env.MONGO_URL);
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json(userDoc);
});

app.listen(4000);

//Alj8DxZoCCsuqfnD
