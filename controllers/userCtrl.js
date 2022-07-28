const User = require("../models/userModel");

const userCtrl = {
  register: async (req, res) => {
    try {
      res.json({ msg: "Register Test" });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
