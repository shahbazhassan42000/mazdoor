import express from "express";
import user from "./user.js";
import laborsType from "./laborsType.js";
import gig from "./gig.js";
import conversation from "./conversation.js";
import message from "./message.js";
import project from "./project.js";

const { Router } = express;
const api = Router();

// user apis
api.use("/users", user);

//LaborsType apis
api.use("/laborsType", laborsType);

//gig apis
api.use("/gigs", gig);

//conversation apis
api.use("/conversations", conversation);

//message apis
api.use("/messages", message);

//project apis
api.use("/projects", project);

export default api;
