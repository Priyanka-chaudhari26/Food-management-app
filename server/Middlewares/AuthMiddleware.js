const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res,next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user){
         req.user = user;
         console.log('User found and passed to next middleware:', user);
         next();
        //  return res.json({ status: true, user: user.username, userobj : user })
      }
      else return res.json({ status: false })
    }
  })
}