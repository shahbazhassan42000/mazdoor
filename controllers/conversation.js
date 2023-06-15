import mongoose from "mongoose";

import "../models/user.js";
import "../models/message.js";
import "../models/conversation.js";

const User = mongoose.model("users");
const Message = mongoose.model("messages");
const Conversation = mongoose.model("conversations");

export default {
  delete(req, res, next) {
    const id = req.params.id;

    if (!id) return res.status(400).json("Invalid data, must provide conversation ID");

    // validate conversation ID
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid conversation ID");

    Conversation.findById(id)
      .then((conversation) => {
        if (!conversation) return res.status(404).json("Conversation not found");
        //delete conversation from user1 and user2
        User.findById(conversation.user1)
          .then((user1) => {
            if (!user1) return res.status(404).json("User1 not found");
            user1.conversations.pull(conversation._id);
            user1.save()
              .then((user1) => {
                if (!user1) console.log("Error deleting conversation from user1");
                User.findById(conversation.user2)
                  .then((user2) => {
                    if (!user2) return res.status(404).json("User2 not found");
                    user2.conversations.pull(conversation._id);
                    user2.save()
                      .then((user2) => {
                        if (!user2) console.log("Error deleting conversation from user2");
                        //delete all the messages of this conversation
                        conversation.messages.forEach((message) => {
                          Message.findById(message)
                            .then((message) => {
                              if (!message) console.log("Error deleting message");
                              message.remove()
                                .then(() => {
                                  console.log("Message deleted");
                                }).catch(next);
                            }).catch(next);
                        });
                        //delete conversation
                        conversation.remove()
                          .then(() => {
                            // Return the conversation
                            return res.status(204).json(conversation);
                          }).catch(next);
                      }).catch(next);
                  }).catch(next);
              }).catch(next);
          }).catch(next);
      }).catch(next);
  }, // end of delete
  one(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).json("Invalid data, must provide conversation ID");

    // validate conversation ID
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid conversation ID");

    Conversation.findById(id).populate("lastMessage", "message sender").populate("user1", "username name image").populate("user2", "username name image")
      .then((conversation) => {
        if (!conversation) return res.status(404).json("Conversation not found");
        return res.status(200).json(conversation);
      }).catch(next);

  }, //end of one
  byUserID(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).json("Invalid data, must provide user ID");

    // validate user ID
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid user ID");

    Conversation.find({
      $or: [
        { user1: id },
        { user2: id }
      ],
    })
      .populate("lastMessage", "message sender").populate("user1", "username name image").populate("user2", "username name image")
      .then((conversation) => {
        if (!conversation) return res.status(404).json("Conversation not found");
        return res.status(200).json(conversation);
      }).catch(next);
  }, // end of conversation by user ID
  all(req, res, next) {
    Conversation.find().populate("lastMessage", "message sender")
      .then((conversations) => {
        // Return the array of conversations
        return res.status(200).json(conversations);
      })
      .catch((error) => {
        console.log(error);
        // Handle any database errors
        return res.status(400).json(error);
      })
      .catch(next);
  }, //end of all
  create(req, res, next) {
    const data = req.body.conversation;
    if (!data)
      return res.status(400).json("Invalid data, must provide conversation");
    if (!data.user1)
      return res.status(400).json("Invalid data, must provide user1 ID");
    if (!data.user2)
      return res.status(400).json("Invalid data, must provide user2 ID");

    // validate user IDs
    if (!mongoose.Types.ObjectId.isValid(data.user1))
      return res.status(400).json("Invalid user1 ID");
    if (!mongoose.Types.ObjectId.isValid(data.user2))
      return res.status(400).json("Invalid user2 ID");

    //check if conversation exists
    Conversation.findOne({
      $or: [
        { user1: data.user1, user2: data.user2 },
        { user1: data.user2, user2: data.user1 },
      ],
    })
      .then((conversation) => {
        if (conversation)
          return res.status(400).json("Conversation already exists");
        else {
          //check if user1 exists
          User.findById(data.user1)
            .then((user1) => {
              if (!user1) return res.status(404).json("User1 not found");
              //check if user2 exists
              User.findById(data.user2)
                .then((user2) => {
                  if (!user2) return res.status(404).json("User2 not found");
                  //create new conversation
                  const conversation = new Conversation(data);
                  conversation
                    .save()
                    .then((conversation) => {
                      if (!conversation)
                        return res
                          .status(400)
                          .json("Error creating conversation");

                      //add conversation to user1
                      user1.conversations.push(conversation._id);
                      user1
                        .save()
                        .then((user1) => {
                          if (!user1)
                            console.log("Error adding conversation to user1");
                          //add conversation to user2
                          user2.conversations.push(conversation._id);
                          user2
                            .save()
                            .then((user2) => {
                              if (!user2)
                                console.log(
                                  "Error adding conversation to user2"
                                );
                              return res.status(200).json(conversation);
                            })
                            .catch(next);
                        })
                        .catch(next);
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        }
      })
      .catch(next);
  }, //end of create
};
