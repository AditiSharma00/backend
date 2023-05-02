const { User } = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRegister = async (req, res) => {
  try {
    const { name, email, gender } = req.body;
    // const user = await User.findOne({ email });
    // if (user) return res.json({ msg: "User already exists" });

    const handlePass = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      name,
      email,
      gender,
      password: handlePass,
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPresent = await User.findOne({ email });
    if (!userPresent) res.json({ msg: "User not found" });
    const check = await bcrypt.compare(password, userPresent[0].password);
    console.log(check);
    if (!check) {
      res.json("invalid credentials");
    }
    const token = jwt.sign({ userId: userPresent[0]._id }, process.env.secret);
    res.json({ email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { userRegister, userLogin };
