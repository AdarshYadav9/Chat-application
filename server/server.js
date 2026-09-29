import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import messageRoutes from './routes/messageRoutes.js';
import socketHandler from './socket/socketHandler.js';

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Configure CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));

// JSON Middleware
app.use(express.json());

// Set up Socket.io
const io = new Server(server, {
  cors: corsOptions,
});

// Initialize Socket handler
socketHandler(io);

// Routes
app.use('/api/messages', messageRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Chat server is running',
  });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`Global error: ${err.message}`);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
