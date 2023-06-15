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

//get conversation by id
api.get("/:id", auth.authenticate, conversation.one);

//get conversation by user ID
api.get("/userID/:id", auth.authenticate, conversation.byUserID)

// delete conversation by id
api.delete("/:id", auth.authenticate, conversation.delete);

export default api;
