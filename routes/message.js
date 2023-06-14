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

//Get messages by Conversation ID
api.get("/conversationID/:id", auth.authenticate, message.byConversationID);

//delete message by ID
api.delete("/:id", auth.authenticate, message.delete);


export default api;
