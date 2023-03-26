import express from "express";
import user from "./user.js";

const { Router } = express;
const api = Router();

// user apis
api.use("/users", user);


export default api;
