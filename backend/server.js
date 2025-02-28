
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./router/user_router");
const chatRoutes = require("./router/chat_router");
const messageRoutes = require("./router/messageRoutes");
const {notFound , errorHandler } = require("./middleware/errorMiddleware") ;
const cors = require('cors');
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept JSON data
app.use(cors());
// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// -------------------------- Deployment ------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// -------------------------- Deployment ------------------------------

// Error Handling Middleware (Should be the last one)
app.use(notFound);
app.use(errorHandler);
console.log("DEBUG - errorHandler:", errorHandler);

const PORT = process.env.PORT || 5000; 
const server = app.listen(PORT, 
  console.log(`Server running on PORT ${PORT}...`)
);

// Socket.IO Setup

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    socket.leave(socket.id); 
  });
});
