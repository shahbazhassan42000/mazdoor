import jwt from 'jsonwebtoken';
import "../models/user.js";
import mongoose from "mongoose";
const User = mongoose.model("users");

const secretKey=process.env.SECRET_KEY;
export default {
  authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthenticated' });
      }
      //check if user is exists
      console.log("Find user with id: ", user.id);
      User.findById(user.id,(err,user)=>{
        if(user){
          req.user = user;
          next();
        }else{
          return res.status(401).json({ message: 'Unauthenticated' });
        }
      })
      //   .then((user)=>{
      //   req.user = user;
      //   next();
      // }).catch((err)=>{
      //   return res.status(401).json({ message: 'Unauthenticated' });
      // });
    });
  },
  authorize(roles = []) {

    return [
      // authorize based on user role
      (req, res, next) => {
        if (typeof roles === 'string') {
          roles = [roles];
        }
        console.log(roles);
        if (roles.length && !roles.includes(req.user.role)) {
          // user's role is not authorized
          return res.status(403).json({ message: 'Unauthorized' });
        }

        // authentication and authorization successful
        next();
      },
    ];
  },
};
