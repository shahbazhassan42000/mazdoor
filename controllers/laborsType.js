import mongoose from "mongoose";
import _ from "lodash";
import "../models/LaborsType.js";

const { map } = _;

const LaborsType = mongoose.model("LaborsType");


export default {
  getAll(req, res, next) {
    LaborsType.find().then((laborsType) => {
      return res.json(map(laborsType, (type) => CapitalizeAll(type.name)));
    }).catch(next);
  }
  , add(req, res, next) { //add new laborsType
    let type = req.body.name;
    if (!type) {
      return res.status(400).json("must provide type in this format: {name:'type'}");
    }
    const laborsType = new LaborsType();
    type=CapitalizeAll(type);
    //check if type exists
    LaborsType.findOne({ name: type }).then((type) => {
      if (type) return res.status(400).send("type already exists");
    }).catch(next);

    laborsType.name = type;
    return laborsType.save().then(() => {
      return res.json({ laborsType });
    }).catch(next);
  },
  getByName(req, res, next) {
    console.log("GET BY NAME");
    let name = req.params.name;
    if (!name) {
      return res.status(400).json("must provide name in this format: /typeName");
    }
    name=CapitalizeAll(name);
    LaborsType.findOne({ name }).then((laborsType) => {
      if(!laborsType) return res.status(404).json("no type found");
      return res.json({ laborsType });
    }).catch(next);
  }
};

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const CapitalizeAll = (str) => {
  return str.split(" ") // split by spaces
    .map(Capitalize) // capitalize each word
    .join(" "); // join by spaces
}