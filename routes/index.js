import express from "express";
import user from "./user.js";
import laborsType from "./laborsType.js";

const { Router } = express;
const api = Router();

// user apis
api.use("/users", user);

//LaborsType apis
api.use("/laborsType", laborsType);


export default api;
