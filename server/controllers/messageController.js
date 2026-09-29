import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text) {
      return res.status(400).json({
        success: false,
        message: 'Username and text are required',
      });
    }

    const trimmedUsername = username.trim();
    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty',
      });
    }

    const newMessage = await Message.create({
      username: trimmedUsername,
      text: trimmedText,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(100);

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error(`Error fetching messages: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
    });
  }
};
