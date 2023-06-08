import express from "express";
import user from "./user.js";
import laborsType from "./laborsType.js";
import gig from "./gig.js";

const { Router } = express;
const api = Router();

// user apis
api.use("/users", user);

//LaborsType apis
api.use("/laborsType", laborsType);

//gig apis
api.use('/gigs', gig);

export default api;
