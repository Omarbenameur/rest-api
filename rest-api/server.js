const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDb = require("./config/ConnectDb");
const User = require("./model/user");

const app = express();
connectDb();
const PORT = process.env.PORT || 4000;

app.use(express.json());

//CRUD
// add new User
app.post("/add", async (req, res) => {
  const { fullName, email, phone } = req.body;
  try {
    const newUser = User({
      fullName,
      email,
      phone,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

// get all users
app.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

//get oneUser
app.get("/get/:id", async (req, res) => {
  try {
    const TheUser = await User.findById(req.params.id);
    res.send(TheUser);
  } catch (error) {
    console.log(error.message);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send("bye");
  } catch (error) {
    console.log(error.message);
  }
});
app.put("/edit/:id", async (req, res) => {
  try {
    const editedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.send(editedUser);
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is successsfuly runing on PORT ${PORT}`)
);
