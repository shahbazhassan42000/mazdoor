import express from "express";
import messageController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { message } = messageController;

const api = Router();

// get all messages
api.get("/", auth.authenticate, message.all);

// create new message
api.post("/", auth.authenticate, message.create);


export default api;
