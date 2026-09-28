const Message = require('../models/Message');

let onlineUsers = new Map(); // socket.id => username

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining
    socket.on('joinChat', (payload) => {
      try {
        if (!payload || !payload.username) {
          return socket.emit('error', { success: false, message: 'Username is required to join' });
        }
        
        const username = payload.username.trim();
        onlineUsers.set(socket.id, username);
        
        io.emit('userOnline', { username });
        io.emit('onlineUsers', { users: Array.from(onlineUsers.values()) });
      } catch (error) {
        console.error('Socket error on joinChat:', error);
      }
    });

    // Handle incoming messages
    socket.on('sendMessage', async (payload) => {
      try {
        if (!payload || !payload.username || !payload.text) {
          return socket.emit('error', { success: false, message: 'Username and message are required' });
        }

        const username = payload.username.trim();
        const text = payload.text.trim();

        if (text.length === 0 || username.length === 0) {
          return socket.emit('error', { success: false, message: 'Invalid empty message or username' });
        }

        // Save to database
        const savedMessage = await Message.create({
          username,
          text,
        });

        // Broadcast to everyone including sender
        io.emit('receiveMessage', savedMessage);
      } catch (error) {
        console.error('Socket error on sendMessage:', error);
        socket.emit('error', { success: false, message: 'Failed to process message' });
      }
    });

    // Handle typing indicator
    socket.on('typing', (payload) => {
      try {
        if (payload && payload.username) {
          socket.broadcast.emit('typing', { username: payload.username });
        }
      } catch (error) {
        console.error('Socket error on typing:', error);
      }
    });

    // Handle stop typing indicator
    socket.on('stopTyping', (payload) => {
      try {
        if (payload && payload.username) {
          socket.broadcast.emit('stopTyping', { username: payload.username });
        }
      } catch (error) {
        console.error('Socket error on stopTyping:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      try {
        const username = onlineUsers.get(socket.id);
        if (username) {
          onlineUsers.delete(socket.id);
          io.emit('userOffline', { username });
          io.emit('onlineUsers', { users: Array.from(onlineUsers.values()) });
        }
      } catch (error) {
        console.error('Socket error on disconnect:', error);
      }
    });
  });
};

module.exports = socketHandler;
