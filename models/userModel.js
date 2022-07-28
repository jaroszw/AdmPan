const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    role: {
      type: Number,
      defaul: 0,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dy6ktjcsb/image/upload/v1658998260/AuthApp/prof3_dchj8p.webp",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
