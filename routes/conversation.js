import express from "express";
import conversationController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { conversation } = conversationController;

const api = Router();

// get all conversations
api.get("/", auth.authenticate, conversation.all);

// create conversation
api.post("/", auth.authenticate, conversation.create);

export default api;
