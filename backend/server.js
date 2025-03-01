require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Log environment variables to ensure they are loaded correctly
console.log("MAIN_DB_URI:", process.env.MAIN_DB_URI);
console.log("CHAT_DB_URI:", process.env.CHAT_DB_URI);

// Connect to MongoDB (Two Databases)
mongoose.connect(process.env.MAIN_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
})
.then(() => console.log('Connected to MAIN_DB'))
.catch(err => console.error('Error connecting to MAIN_DB:', err));

const messages = mongoose.createConnection(process.env.CHAT_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
});

messages.on("error", (err) => {
  console.error("Error connecting to messages:", err);
});

messages.once("open", () => {
  console.log("Connected to messages");
  console.log("Database Name:", messages.name); // Log the database name

  // Import the Message model using messages connection
  const Message = require("./models/Message")(messages);

  // Socket.io connection
  io.on("connection", (socket) => {
    console.log("User Connected: " + socket.id);

    socket.on("sendMessage", async (message) => {
      try {
        if (!message.user || !message.text) {
          throw new Error("User and text are required fields");
        }
        const newMessage = new Message({ user: message.user, text: message.text });
        await newMessage.save();
        io.emit("message", newMessage);
      } catch (err) {
        console.error("Error saving message:", err);
        socket.emit("error", { message: "Error saving message", error: err.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected: " + socket.id);
    });
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/chatdb", chatRoutes);

module.exports = { mainDB: mongoose.connection, messages };