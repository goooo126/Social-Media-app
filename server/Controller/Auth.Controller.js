const UserModel = require('../Models/User.Model.js');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(201).json({ sucsess: true, registerUser: user });
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({ status: false, message: 'User not Found' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword) {
      res.status(400).json({ status: false, message: 'Password is wrong' });
    }

    res.status(200).json({ status: true, loginUser: user });
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};

module.exports = { register, login };
