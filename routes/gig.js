import express from "express";
import gigController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { gig } = gigController;

const api = Router();

// get all gigs
api.get('/',auth.authenticate, gig.all);

// create gig
api.post('/',auth.authenticate, gig.create);

//delete gig by id
api.delete('/:id',auth.authenticate, gig.deleteByID);

export default api;