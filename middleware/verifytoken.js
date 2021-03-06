const user = require("../models/User");
const secret = require("../config/keys");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
   const token = req.headers["x-access-token"];
  
   if (!token)
     return res.json({
       status: 500,
       auth: false,
       message: "No token provided.",
     });
   jwt.verify(token, secret.secretOrKey, function (err, decoded) {
     if (err) {
       return res.json({
         status: 500,
         auth: false,
         message: "Failed to authenticate token.",
       });
     }
   //   console.log(decoded);
   
     req.username = decoded.name;
     next();
   });
 }

 module.exports = verifyToken;