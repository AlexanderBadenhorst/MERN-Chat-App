const express = require("express");
const router = express.Router();
const { messages } = require("../server"); 

let Message;

if (messages) {
  messages.once("open", () => {
    console.log("messages connection established in chatRoutes");
    Message = require("../models/Message")(messages);

    // Get all messages
    router.get("/messages", async (req, res) => {
      try {
        const messages = await Message.find();
        res.json(messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
      }
    });

    // Save a new message
    router.post("/messages", async (req, res) => {
      console.log("POST /messages called");
      try {
        const { user, text } = req.body;
        const newMessage = new Message({ user, text });
        await newMessage.save();
        console.log("Message saved:", newMessage);
        res.status(201).json(newMessage);
      } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
      }
    });
  });
} else {
  console.error("messages is undefined");
}

module.exports = router;