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

    console.log("DELETING...", id);

    if (!id) return res.status(400).json("Invalid data, must provide message ID");

    // validate message ID
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid message ID");

    Message.findByIdAndDelete(id).then((msg) => {
      if (!msg) return res.status(404).json("Message not found");

      console.log("Conversation ID", msg.conversation);

      //update conversation
      Conversation.findOneAndUpdate({ _id: msg.conversation }, { $pull: { messages: id } }, { new: true })
        .then((conversation) => {
          if (!conversation) return res.status(404).json("Conversation not found");
          return res.status(204).json("Message deleted successfully");
        }).catch(next);
    }).catch(next);
  }, // end of delete
  all(req, res, next) {
    Message.find()
      .then(messages => {
        // Return the array of messages
        return res.status(200).json(messages);
      })
      .catch(error => {
        console.log(error);
        // Handle any database errors
        return res.status(400).json(error);
      })
      .catch(next);
  }, //end of all
  byConversationID(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).json("Invalid data, must provide conversation ID");

    // validate conversation ID
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid conversation ID");

    // check first if conversation exists
    Conversation.findById(id)
      .then(conversation => {
        if (!conversation) return res.status(404).json("Conversation not found");
        Message.find({ conversation: id }).populate("sender", "username name image").populate("receiver", "username name image").sort({
          createdAt: 1
        })
          .then(messages => {
            // Return the array of messages
            return res.status(200).json(messages);
          })
          .catch(error => {
            console.log(error);
            // Handle any database errors
            return res.status(400).json(error);
          })
          .catch(next);

      }).catch(next);
  }, //end of byConversationID
  create(req, res, next) {
    const data = req.body.message;
    if (!data) return res.status(400).json("Invalid data, must provide message");
    if (!data.sender) return res.status(400).json("Invalid data, must provide sender ID");
    if (!data.receiver) return res.status(400).json("Invalid data, must provide receiver ID");
    if (!data.message) return res.status(400).json("Invalid data, must provide message");

    // validate user ID
    if (!mongoose.Types.ObjectId.isValid(data.sender))
      return res.status(400).json("Invalid sender ID");
    // validate conversation ID
    if (data.conversation && !mongoose.Types.ObjectId.isValid(data.conversation))
      return res.status(400).json("Invalid conversation ID");

    //check if sender exists
    User.findById(data.sender)
      .then(sender => {
        if (!sender) return res.status(404).json("Sender not found");
        //check if receiver exists
        User.findById(data.receiver)
          .then(receiver => {
            if (!receiver) return res.status(404).json("Receiver not found");
            if (!data.conversation) {
              const conversation = new Conversation({
                user1: data.sender,
                user2: data.receiver
              });
              conversation.save().then(conversation => {
                if (!conversation) return res.status(400).json("Error creating conversation");
                data.conversation = conversation._id;
                //create new message
                const message = new Message(data);
                message.save().then(message => {
                  if (!message) return res.status(400).json("Error creating message");
                  //add conversation to sender
                  sender.conversations.push(conversation._id);
                  sender.save().then(sender => {
                    if (!sender) return res.status(400).json("Error adding conversation to sender");
                    //add conversation to receiver
                    receiver.conversations.push(conversation._id);
                    receiver.save().then(receiver => {
                      if (!receiver) return res.status(400).json("Error adding conversation to receiver");
                      //add message to conversation
                      conversation.messages.push(message._id);
                      // add message to conversation lastMessage
                      conversation.lastMessage = message._id;
                      conversation.save().then(conversation => {
                        if (!conversation) return res.status(400).json("Error adding message to conversation");
                        return res.status(201).json(message);
                      }).catch(next);
                    }).catch(next);
                  }).catch(next);
                }).catch(next);
              }).catch(next);
            } else {
              //check if conversation exists
              Conversation.findById(data.conversation)
                .then(conversation => {
                  if (!conversation) return res.status(404).json("Conversation not found");
                  //create new message
                  const message = new Message(data);
                  message.save().then(message => {
                    if (!message) return res.status(400).json("Error creating message");
                    //add message to conversation
                    conversation.messages.push(message._id);
                    // add message to conversation lastMessage
                    conversation.lastMessage = message._id;
                    conversation.save().then(conversation => {
                      if (!conversation) return res.status(400).json("Error adding message to conversation");
                      return res.status(201).json(message);
                    }).catch(next);
                  }).catch(next);
                }).catch(next);
            }
          }).catch(next);
      })
      .catch(next);
  } //end of create
};
