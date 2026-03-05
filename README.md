# MERN Chat Application

A full-stack real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js).
This project demonstrates user authentication, persistent messaging, REST API design, and integration between a React frontend and Node.js backend services.

---

## Overview

The MERN Chat Application allows users to register, log in, and exchange messages in real time.
Messages are stored persistently in MongoDB, and the application provides a responsive interface built with React.

This project was created to practice and demonstrate full-stack development concepts including API design, authentication, database interaction, and client-server communication.

---

## Features

- User registration and authentication
- Secure login with session handling
- Real-time messaging between users
- Persistent message storage in MongoDB
- REST API for user and message management
- Responsive React-based user interface
- Separation of frontend and backend architecture

---

## Tech Stack

### Frontend
- React
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST API architecture

### Database
- MongoDB
- Mongoose ODM

### Development Tools
- Git
- GitHub
- npm

---

## Architecture

The application follows a typical MERN architecture:

Client (React)
      │
      │ HTTP Requests
      ▼
Node.js / Express REST API
      │
      ▼
MongoDB Database

- The React frontend handles the user interface and communicates with the backend through API requests.
- The Node.js + Express backend processes authentication, message routing, and database interactions.
- MongoDB stores users and messages persistently.

---

## Installation

### 1. Clone the repository

git clone https://github.com/AlexanderBadenhorst/MERN-Chat-App.git
cd MERN-Chat-App

### 2. Install backend dependencies

cd backend
npm install

### 3. Install frontend dependencies

cd ../frontend
npm install

---

## Running the Application

### Start the backend server

cd backend
npm start

### Start the frontend

cd frontend
npm start

The application will typically run at:

http://localhost:3000

---

## Learning Goals

This project helped reinforce several key software development concepts:

- Building RESTful APIs with Express
- Structuring full-stack applications using the MERN stack
- Managing client-side state in React
- Designing MongoDB schemas and data models
- Implementing authentication workflows
- Connecting frontend applications to backend services

---

## Future Improvements

Possible enhancements include:

- WebSocket-based real-time messaging
- Message notifications
- Group chats
- Improved UI/UX design
- Deployment to a cloud platform
- Containerization with Docker

---

## Author

Alexander Badenhorst

Junior Software Developer focused on backend systems using Java, Spring Boot, and PostgreSQL, with additional experience building full-stack web applications.

Portfolio:
https://alexanderbadenhorst.github.io/Portfolio_Website/

GitHub:
https://github.com/AlexanderBadenhorst
