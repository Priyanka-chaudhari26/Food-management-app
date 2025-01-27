require("dotenv").config();
const jwt = require("jsonwebtoken");
const {userverification}= require("../Middlewares/AuthMiddleware");

module.exports.User = async (req, res) => {
    const user = req.user;
    console.log(user);
    if (user) {
      res.status(200).json({ status: true, user: user.username} );
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  };
  