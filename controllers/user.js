import _ from "lodash";
import mongoose from "mongoose";
import passport from "passport";
import role from "../utils/role.js";
import crypto from "crypto";

import "../models/user.js";
import "../utils/passport.js";
import "../models/token.js";
import "../models/LaborsType.js";
import "../models/conversation.js"
import "../models/message.js"
import "../models/project.js"
import "../models/gig.js"
import { sendEmail } from "../utils/EmailSender.js";
import { Capitalize, CapitalizeAll } from "./laborsType.js";

const { includes, keys, size } = _;

const User = mongoose.model("users");
const Token = mongoose.model("token");
const LaborsType = mongoose.model("LaborsType");
const Message = mongoose.model("messages");
const Conversation = mongoose.model("conversations");
const Project = mongoose.model("projects");
const Gig = mongoose.model("gigs");

export default {
  login(req, res, next) {
    if (!req.body.user || size(req.body.user) !== 2) {
      return res.sendStatus(400);
    }
    let check = check_login_requiredFields(req.body.user);
    if (check !== "") {
      return res.status(400).json({ errors: check });
    }
    passport.authenticate("local", { session: false }, async function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        if (user.role !== "ADMIN" && user.status === "unverified") {
          let token = await Token.findOne({ userId: user._id });
          if (!token) {
            token = await new Token({ userId: user._id, token: crypto.randomBytes(16).toString("hex") }).save();
          }
          await sendVerificationEmail(user.email, user._id, token.token);
          return res.status(400).json("An email has been sent to your email address. Please verify your email address to login.");
        }
        if (user.role !== "ADMIN" && user.status === "blocked") {
          return res.status(400).json("Your account has been blocked by admin. Please contact admin for more details.");
        }
        const jwtToken = user.generateJWT();
        return res.status(200).json(jwtToken);
      } else {
        return res.status(400).json("Invalid username or password");
      }
    })(req, res, next);
  },
  signup(req, res, next) {
    if (!req.body.user) {
      return res.sendStatus(400);
    }
    let check = check_signup_requiredFields(req.body.user);
    if (check !== "") {
      return res.status(400).json({ error: check });
    }

    // check if password is 8 character long and have at least one number and one alphabet and one special character and one uppercase
    if (!req.body.user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$\-!%*?&])[A-Za-z\d@\-$!%*?&]{8}$/)) {
      return res.status(400).json({
        type: "password",
        msg: "Password must be at lease 8 characters, one uppercase, one digit, one alphabet and one special character"
      });
    }
    let user = new User();
    Object.assign(user, req.body.user);
    if (user.role === "LABOR") Object.assign(user, { rating: 90, startingWage: 1000 });
    if (user.role !== "ADMIN") {
      Object.assign(user, { status: "unverified", profileCompleted: false });
      validatePaymentMethod(user);
    }

    if (user.role === "ADMIN") {
      console.log("admin");
      if (user.gigs) delete user.gigs;
      console.log(user);
    }


    user.setPassword(req.body.user.password);

    //adding new labor type if not exist
    if (user.type) AddNewLaborType(user.type);


    user.save().then(async () => {
      //generating token for email verification
      if (user.role !== "ADMIN") {
        const token = await new Token({ userId: user._id, token: crypto.randomBytes(16).toString("hex") }).save();
        await sendVerificationEmail(user.email, user._id, token.token);
      }
      return res.status(201).json(`User created successfully with id: ${user._id}`);
    }, error => {
      return res.status(400).json({
        type: keys(error.errors)[0],
        msg: error.errors[keys(error.errors)[0]]["properties"]["message"]
      });
    }).catch(next);
  },
  verifyEmail(req, res, next) {
    User.findOne({ _id: req.params.id }).then(user => {
      if (!user) {
        return res.status(400).json("Invalid link");
      }
      Token.findOne({ userId: user._id, token: req.params.token }).then(token => {
        if (!token) {
          return res.status(400).json("Invalid link");
        }
        // user.status = "verified";
        User.findByIdAndUpdate(user._id, { status: "verified" },
          function (err) {
            if (err) {
              return res.status(400).json("Error while verifying email, please try again later");
            } else {
              token.remove();
              return res.status(200).json("Email verified successfully");
            }
          });
      }).catch(err => {
        return res.status(400).json("error while verifying email");
      });
    }).catch(err => {
      return res.status(400).json("ERROR while verifying email");
    }).catch(next);
  },
  getByToken(req, res, next) {
    const user = req.user;
    //return everything except password and salt and hash
    return res.status(200).json({ "user": filterUser(user) });
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
  },
  all(req, res) {
    User.find({
      role: {
        $ne: "ADMIN"
      }
    }, "-salt -hash -__v").then(function (users) {
      if (users)
        return res.status(200).json(users);
      return res.status(404).json({ msg: "no users found" });
    }, err => {
      console.log(err);
      return res.status(400).json({ msg: "ERROR!!! While fetching users." });
    });

  },
  update(req, res, next) {
    if (!req.body.user) return res.status(400).json("must provide user object in this format {user:{...}}");
    let user = req.body.user;

    if (!user._id) return res.status(400).json("must provide user id in this format {user:{_id:...}}");


    //adding new labor type if not exist
    if (user.type) AddNewLaborType(user.type);

    updateProfileCompleted(user);

    //updating validate payment method
    validatePaymentMethod(user);


    //removed username, password,email,role from update if exist
    if (user.username) delete user.username;
    if (user.password) delete user.password;
    if (user.email) delete user.email;
    if (user.role) delete user.role;


    console.log("Updating user:...");
    console.log(user);

    //update user
    User.findByIdAndUpdate(user._id, { ...user }).then(updatedUser => {
      if (!updatedUser) return res.status(400).json("user not found against the given id");
      User.findById(user._id).then(user => {
        return res.status(200).json(user);
      });
    }).catch(next);
  },
  delete(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).json("Invalid data, must provide user ID");
    // validate user ID
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json("Invalid user ID");
    User.findById(id)
      .then(async (user) => {
        if (!user) return res.status(404).json("User not found");
        console.log("------------------------- Deleting user conversation");
        //delete conversation
        if (user.conversations) {
          console.log("Deleting conversations: " + user.conversations);
          // create an array of promises for deleting each conversation
          const conversationPromises = user.conversations.map(
            async (conversation) => {
              try {
                // find the conversation by id
                const conv = await Conversation.findById(conversation);
                if (conv) {
                  // delete the conversation from user1 and user2
                  if (conv.user1) {
                    await User.updateOne(
                      { _id: conv.user1 },
                      { $pull: { conversations: conv._id } }
                    );
                  }
                  if (conv.user2) {
                    await User.updateOne(
                      { _id: conv.user2 },
                      { $pull: { conversations: conv._id } }
                    );
                  }
                  // delete all the messages of this conversation
                  if (conv.messages) {
                    await Message.deleteMany({ _id: { $in: conv.messages } });
                  }
                  // delete conversation
                  await conv.remove();
                }
              } catch (error) {
                next(error);
              }
            }
          );
          // wait for all the conversation promises to resolve
          await Promise.all(conversationPromises);
        }
        console.log("------------------------- Deleting user gigs");
        //delete gig
        if (user.gigs) {
          // delete all the gigs of this user
          await Gig.deleteMany({ _id: { $in: user.gigs } });
        }
        console.log("------------------------- Deleting user projects");
        // delete projects
        if (user.projects) {
          // delete all the projects of this user
          await Project.deleteMany({ _id: { $in: user.projects } });
        }
        console.log("------------------------- Deleting user");
        // delete user
        await user.remove();
        //send response
        return res.status(204).json(user);
      })
      .catch(next);
  }, // end of delete
  checkEmail(req, res, next) {
    const user = req.body.user;
    if (!user || size(user) !== 1) {
      return res.sendStatus(400);
    }
    if (!user.email) return res.status(400).json({ error: "Email can't be blank" });
    User.findOne({ email: user.email }).then(user => {
      if (user) return res.status(200).json({ status: "error", message: "Email is already taken" });
      else return res.status(200).json({ status: "success", message: "Email is available" });
    }).catch(next);
  },
  getUsersByRole(req, res, next) {
    const role = req.query.role;
    // sort by _id
    User.find({ role }).sort({ _id: 1 }).populate("gigs").then((users) => {
      if (users) {
        //filter users
        users = users.map(user => {
          return filterUser(user);
        });

        return res.status(200).json(users);
      }
      return res.status(404).json({ msg: "no users found" });
    }, err => {
      return res.status(400).json({ msg: "ERROR!!! While fetching users." });
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
};

export const filterUser = (user) => {
  user.hash = undefined;
  user.salt = undefined;
  user.__v = undefined;
  return user;
};

const sendVerificationEmail = async (email, id, token) => {
  const URL = `${process.env.BASE_URL}/users/verification/${id}/verify/${token}`;
  const subject = "Email Verification";
  const text = `Please verify your email by clicking on the link: ${URL}`;
  await sendEmail(email, subject, text);
};

export const AddNewLaborType = (type) => {
  //Capitalizing type
  type = CapitalizeAll(type);
  //checking if this type exists in our database if not then add it
  LaborsType.findOne({ name: type }).then((laborsType) => {
    if (!laborsType) {
      const laborsType = new LaborsType();
      laborsType.name = type;
      laborsType.save();
    }
  });
};

const validatePaymentMethod = (user) => {
  if (user.paymentMethod === "Card") {
    user.mobAccName = "";
    user.mobAccNumber = "";
  } else if (user.paymentMethod === "Mobile Account") {
    user.cardName = "";
    user.cardNumber = "";
    user.cardExpiry = "";
    user.cvv = "";
  } else if (user.paymentMethod !== "Both") {
    user.cardName = "";
    user.cardNumber = "";
    user.cardExpiry = "";
    user.cvv = "";
    user.mobAccName = "";
    user.mobAccNumber = "";
  }
};

const updateProfileCompleted = (user) => {
  if (user.role === "LABOR") {
    if (user.CNIC && user.startingWage && user.type && user.phone && user.area && user.state && user.city && (user.paymentMethod === "Card" || user.paymentMethod === "Mobile Account" || user.paymentMethod === "Both")) {
      user.profileCompleted = true;
    } else {
      user.profileCompleted = false;
    }
  } else {
    if (user.CNIC && user.phone && user.area && user.state && user.city && (user.paymentMethod === "Card" || user.paymentMethod === "Mobile Account" || user.paymentMethod === "Both")) {
      user.profileCompleted = true;
    } else {
      user.profileCompleted = false;
    }
  }
};