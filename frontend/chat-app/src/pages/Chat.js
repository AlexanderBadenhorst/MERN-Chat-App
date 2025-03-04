import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./Chat.css"; // Import the CSS file for styling

const socket = io("http://localhost:5000"); // Adjust the URL if your server is running on a different address

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [newText, setNewText] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Get username from local storage
  const username = localStorage.getItem("username") || "";

  useEffect(() => {
    // Check if username is set in local storage
    if (!username) {
      console.error("Username is not set in local storage");
      navigate("/login"); // Redirect to login if username is not set
      return;
    }

    // Load existing messages from the server
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chatdb/messages");
        console.log("Fetched messages:", res.data); // Log the fetched messages for debugging
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [username, navigate]); // Ensure navigate is included in the dependency array

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (!username) {
        console.error("Username is not set");
        return;
      }
      const newMessage = { user: username, text: message };
      console.log("Sending message:", newMessage); // Log the message for debugging
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  const editMessage = async (id, newText) => {
    console.log("Editing message with ID:", id); // Log the message ID for debugging
    try {
      const res = await axios.put(`http://localhost:5000/api/chatdb/messages/${id}`, {
        user: username,
        text: newText,
      });
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg._id === id ? res.data : msg))
      );
      setEditingMessage(null);
      setNewText("");
    } catch (err) {
      console.error("Error editing message:", err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/chatdb/messages/${id}`, {
        data: { user: username },
      });
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      editMessage(id, e.target.value);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat Room
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === username ? "user" : "other"}`}>
            <strong>{msg.user}: </strong>
            {editingMessage === msg._id ? (
              <input
                type="text"
                defaultValue={msg.text}
                onBlur={(e) => editMessage(msg._id, e.target.value)}
                onKeyPress={(e) => handleEditKeyPress(e, msg._id)}
              />
            ) : (
              msg.text
            )}
            {msg.user === username && (
              <div className="message-actions">
                <button className="edit-button" onClick={() => setEditingMessage(msg._id)}>Edit</button>
                <button className="delete-button" onClick={() => deleteMessage(msg._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <form onSubmit={sendMessage} className="chat-form">
          <input
            type="text"
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;