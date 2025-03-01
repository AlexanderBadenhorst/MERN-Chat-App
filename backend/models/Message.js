const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = (connection) => {
  if (!connection) {
    throw new Error("Connection is required to create the Message model");
  }
  return connection.model("Message", messageSchema, "messages"); // Specify the collection name as "messages"
};