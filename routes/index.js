import express from "express";
import user from "./user.js";

const { Router } = express;
const api = Router();

// user apis
api.use("/user", user);


export default api;
