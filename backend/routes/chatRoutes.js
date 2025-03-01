const express = require("express");
const router = express.Router();
const { chatDB } = require("../server"); // Import the chatDB connection

let Message;

// Ensure chatDB is connected before importing the Message model
if (chatDB) {
  chatDB.once("open", () => {
    console.log("chatDB connection established in chatRoutes");
    Message = require("../models/Message")(chatDB);

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
  console.error("chatDB is undefined");
}

module.exports = router;