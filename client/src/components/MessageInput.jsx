import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ onSendMessage, onTyping, onStopTyping }) => {
  const [text, setText] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);

    if (e.target.value.trim().length > 0) {
      onTyping();
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        onStopTyping();
      }, 1500);
    } else {
      clearTimeout(typingTimeoutRef.current);
      onStopTyping();
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onSendMessage(trimmed);
      setText("");
      clearTimeout(typingTimeoutRef.current);
      onStopTyping();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="message-input-container">
      <textarea
        className="message-input"
        placeholder="Type a message..."
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows="1"
        aria-label="Type a message"
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={!text.trim()}
        aria-label="Send message"
      >
        ➤
      </button>
    </div>
  );
};

export default MessageInput;
