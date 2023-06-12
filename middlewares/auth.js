import jwt from "jsonwebtoken";
import "../models/user.js";
import mongoose from "mongoose";
const User = mongoose.model("users");
export default {
  authenticate(req, res, next) {
    const secretKey = process.env.SECRET_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      console.log("token not found");
      return res.status(401).json({ message: 'Unauthenticated' });
    }
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log("token not valid");
        return res.status(401).json({ message: 'Unauthenticated' });
      }
      //check if user is exists
      User.findById(user.id) // find the user by id
        .populate("gigs", "-__v") // populate the gigs field with the gig documents
        .exec((err, user) => {
          if (user) {
            req.user = user;
            return next();
          } else {
            console.log("User not exists against the token");
            return res.status(401).json({ message: 'Unauthenticated' });
          }
        })
    });
  },
  authorize(roles = []) {

    return [
      // authorize based on user role
      (req, res, next) => {
        if (typeof roles === 'string') {
          roles = [roles];
        }
        if (roles.length && !roles.includes(req.user.role)) {
          // user's role is not authorized
          console.log("user's role is not authorized");
          return res.status(403).json({ message: 'Unauthorized' });
        }

        // authentication and authorization successful
        next();
      },
    ];
  },
};
