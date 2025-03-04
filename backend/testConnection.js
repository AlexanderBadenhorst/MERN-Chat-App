// filepath: /c:/Users/alexa/OneDrive/Desktop/College/Bootcamp/Web Development/Project/mern-chat-app/backend/testConnection.js
require("dotenv").config();
const mongoose = require("mongoose");

const messages = mongoose.createConnection(process.env.CHAT_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
});

messages.on("error", (err) => {
  console.error("Error connecting to messages:", err);
});

messages.once("open", async () => {
  console.log("Connected to messages");

  const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  const Message = messages.model("Message", messageSchema);

  try {
    const allMessages = await Message.find();
    console.log("Fetched messages:", allMessages);
  } catch (err) {
    console.error("Error fetching messages:", err);
  } finally {
    messages.close();
  }
});