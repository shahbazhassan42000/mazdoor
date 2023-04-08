import _ from "lodash";
import mongoose from "mongoose";
import passport from "passport";
import role from "../utils/role.js";

import "../models/user.js";
import "../utils/passport.js";

const { includes, keys, size, omit} = _;

const User = mongoose.model("users");

export default {
  checkEmail(req, res, next) {
    const user=req.body.user;
    if (!user || size(user) !== 2) {
      return res.sendStatus(400);
    }
    if(!user.email) return res.status(400).json({ error: "Email can't be blank" });
    if(!user.role) return res.status(400).json({ error: "Role can't be blank" });
    User.findOne({ email:user.email, role:user.role }).then(user => {
      if (user) return res.status(200).json({status:'error',message:"Email is already taken"});
      else return res.status(200).json({status:'success',message:"Email is available"});
    }).catch(next);
  },
  login(req, res, next) {
    if (!req.body.user || size(req.body.user) !== 2) {
      return res.sendStatus(400);
    }
    let check = check_login_requiredFields(req.body.user);
    if (check !== "") {
      return res.status(400).json({ errors: check });
    }
    passport.authenticate("local", { session: false }, function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        user.token = user.generateJWT();
        return res.status(200).json(user.token);
      } else {
        console.log("error:", info);
        return res.status(400).json(info);
      }
    })(req, res, next);
  },
  getUsersByType(req, res, next) {
    const type = req.query.type;
    User.find({ role: type }).then((users) => {
      if (users){
        //filter users
         users=users.map(user=>{
          return filterUser(user);
         });
        return res.status(200).json(users);
      }
      return res.status(404).json({ msg: "no users found" });
    }, err => {
      return res.status(400).json({ msg: "ERROR!!! While fetching users." });
    });
  },
  all(req, res) {
    User.find({}).then(function(users) {
      if (users)
        return res.status(200).json(users);
      return res.status(404).json({ msg: "no users found" });
    }, err => {
      console.log(err);
      return res.status(400).json({ msg: "ERROR!!! While fetching users." });
    });

  },
  signup(req, res, next) {
    if (!req.body.user) {
      return res.sendStatus(400);
    }
    let check = check_signup_requiredFields(req.body.user);
    if (check !== "") {
      return res.status(400).json({ error: check });
    }
    let user = new User();
    Object.assign(user, req.body.user);
    user.setPassword(req.body.user.password);

    user.save().then(() => {
      return res.status(201).json(`User created successfully with id: ${user._id}`);
    }, error => {
      return res.status(400).json({
        type: keys(error.errors)[0],
        msg: error.errors[keys(error.errors)[0]]["properties"]["message"]
      });
    }).catch(next);
  },
  getByToken(req, res, next) {
    const user=req.user;
    //return everything except password and salt and hash
    return res.status(200).json({"user":filterUser(user)});
  },
  one(req, res, next) {
    const username = req.params.username;
    if (!username || username === "" || username === ":username") {
      return res.sendStatus(400);
    }
    console.log("Getting a user");
    User.findOne({ username }).then(user => {
      if (user) return res.status(200).json({ user: user.toAuthJSON() });
      else next();
    }).catch(next);
    // User.findById(req.payload.id).then(function (user) {
    //     if (!user) {
    //         return res.sendStatus(401);
    //     }
    //     console.log('Fetching a user');
    //     return res.status(200).json({user: user.toAuthJSON()});
    // }).catch(next);
  },
  update(req, res, next) {
    if (req.body.user) {
      User.findByIdAndUpdate(req.body.user.id, { ...req.body.user },
        function(err) {
          if (err) {
            return res.sendStatus(400);
          } else {
            User.findById(req.body.user.id).then(function(user) {
              if (!user) {
                return res.sendStatus(400);
              }
              return res.status(200).json(user);
            }).catch(next);
          }
        });
    } else {
      return res.sendStatus(400);
    }
  }, delete(req, res) {
    const user=req.body.user;
    if (!user || size(user) !== 1) {
      return res.sendStatus(400);
    }
    if(!user.id) res.sendStatus(400);
    User.findByIdAndRemove(user.id,
      function(err) {
        if (err) {
          return res.sendStatus(401);
        } else {
          return res.sendStatus(204);
        }
      });
  }
};

const check_signup_requiredFields = (user) => {
  if (!user.username) {
    return { username: "can't be blank" };
  }
  if (!user.email) {
    return { email: "can't be blank" };
  }
  if (!user.password) {
    return { password: "can't be blank" };
  }
  if (!user.role) {
    return { role: "can't be blank" };
  } else if (!includes(role, user.role)) {
    return { role: "is not supported yet" };
  }
  return "";
};

const check_login_requiredFields = (user) => {
  if (!user.username) {
    return { username: "can't be blank" };
  }
  if (!user.password) {
    return { password: "can't be blank" };
  }
  return "";
}

export const filterUser=(user) => {
  user.hash = undefined;
  user.salt = undefined;
  if(user.role==='ADMIN' || user.role==='CUSTOMER'){
    user.rating=undefined;
    user.type=undefined;
  }
  if(user.role==='ADMIN'){
    user.status=undefined;
  }
  user.__v=undefined;
  return user;
}
