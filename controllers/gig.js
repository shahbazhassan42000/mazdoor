import mongoose from "mongoose";

import "../models/gig.js";
import "../models/user.js";
import "../models/LaborsType.js";

const Gig = mongoose.model("gigs");
const User = mongoose.model("users");
const LaborsType = mongoose.model("LaborsType");
import { Capitalize } from "./laborsType.js";
import { AddNewLaborType } from "./user.js";


export default {
  deleteByID(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).json("Invalid data, must provide gig ID");
    // validate gig ID
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid gig ID");
    Gig.findByIdAndDelete(id).then((gig) => {
      if (!gig) return res.status(404).json("Gig not found");
      User.findOneAndUpdate({ _id: gig.user }, { $pull: { gigs: id } }, { new: true })
        .then((user) => {
          if (!user) return res.status(404).json("User not found");
          return res.status(204).json("Gig deleted successfully");
        }).catch(next);
    }).catch(next);
  },
  all(req, res, next) {
    Gig.find().populate("user","-hash -salt -__v")
      .then((gigs) => {
        // Return the array of gigs
        return res.status(200).json(gigs);
      })
      .catch((error) => {
        console.log(error);
        // Handle any database errors
        return res.status(400).json(error);
      }).catch(next);
  },
  create(req, res, next) {
    // Create a new gig instance with the request body data
   const data=req.body.gig;
   if(!data) return res.status(400).json("Invalid data, must provide gig");
   if(!data.title) return res.status(400).json("Invalid data, must provide title");
    if(!data.description) return res.status(400).json("Invalid data, must provide description");
    if(!data.price) return res.status(400).json("Invalid data, must provide price");
    if(!data.category) return res.status(400).json("Invalid data, must provide category");
    if(!data.deliveryTime) return res.status(400).json("Invalid data, must provide deliveryTime");
    if(!data.area) return res.status(400).json("Invalid data, must provide area");
    if(!data.user) return res.status(400).json("Invalid data, must provide user ID");
    if(!data.image) return res.status(400).json("Invalid data, must provide GIG image");

    // validate user ID
    if(!mongoose.Types.ObjectId.isValid(data.user)) return res.status(400).json("Invalid user ID");

    //add new labor type if not exists
    AddNewLaborType(data.category);

    //check if gig title exists
    Gig.findOne({title:data.title}).then((gig)=>{
      if(gig) return res.status(400).send("Gig title already exists");
    }).catch(next);

    // check if user exists
    User.findById(data.user).then((user)=>{
      if(!user) return res.status(404).json("User not found");
      // create new gig
      const gig = new Gig(data);
      gig.save().then((gig)=>{
        //push gig to user gigs
        user.gigs.push(gig);
        user.save()
        return res.status(201).json({gig});
      }).catch(next);

    }).catch(next);



  }
};