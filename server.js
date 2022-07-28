require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/user", require("./routes/userRouter"));
app.use("/", (rea, res, next) => {
  res.json({ msg: "hello" });
});

const PORT = process.env.port || 5000;
const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.listen(PORT, () => {
  console.log("Serveri is running on port", PORT);
});
