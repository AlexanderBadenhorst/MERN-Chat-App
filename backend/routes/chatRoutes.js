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
      console.log("GET /messages called");
      try {
        const messages = await Message.find();
        console.log("Fetched messages:", messages);
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

    // Edit a message
    router.put("/messages/:id", async (req, res) => {
      console.log("PUT /messages/:id called");
      try {
        const { id } = req.params;
        const { user, text } = req.body;
        const message = await Message.findById(id);
        if (!message) {
          return res.status(404).json({ message: "Message not found" });
        }
        if (message.user !== user) {
          return res.status(403).json({ message: "You can only edit your own messages" });
        }
        message.text = text;
        await message.save();
        console.log("Message edited:", message);
        res.json(message);
      } catch (err) {
        console.error("Error editing message:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
      }
    });

    // Delete a message
    router.delete("/messages/:id", async (req, res) => {
      console.log("DELETE /messages/:id called");
      try {
        const { id } = req.params;
        const { user } = req.body;
        const message = await Message.findById(id);
        if (!message) {
          return res.status(404).json({ message: "Message not found" });
        }
        if (message.user !== user) {
          return res.status(403).json({ message: "You can only delete your own messages" });
        }
        await message.remove();
        console.log("Message deleted:", message);
        res.json({ message: "Message deleted" });
      } catch (err) {
        console.error("Error deleting message:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
      }
    });
  });
} else {
  console.error("messages is undefined");
}

module.exports = router;