const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const CLIENT_URL = process.env.CLIENT_URL;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill all fields" });

      if (!validateEmail(email)) return res.json({ msg: "Invalid email" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters long" });

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already registered" });

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;

      sendMail(email, url);
      res.json({
        msg: "Register Success! Please activate your account to start",
      });
    } catch (error) {
      return res.status(500).json({ msg: "error" + error.message });
    }
  },
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

module.exports = userCtrl;
