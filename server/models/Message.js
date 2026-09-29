import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [2, 'Username must be at least 2 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  text: {
    type: String,
    required: [true, 'Message text is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
