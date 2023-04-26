import mongoose from "mongoose";
import _ from "lodash";
import "../models/LaborsType.js";

const {map} = _;

const LaborsType=mongoose.model('LaborsType');


export default {
  getAll(req,res,next){
    LaborsType.find().then((laborsType)=>{
      return res.json(map(laborsType,(type)=>type.name))
    }).catch(next)
  }
  ,add(req,res,next){ //add new laborsType
    const type=req.body.name;
    if(!type){
      return res.status(400).json("must provide type in this format: {name:'type'}");
    }
    const laborsType=new LaborsType();
    laborsType.name=type;
    return laborsType.save().then(()=>{
      return res.json({laborsType})
    }).catch(next)
  }
}