const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.get("/register", userCtrl.register);

module.exports = router;
