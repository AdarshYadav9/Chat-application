import React from "react";

const MessageBubble = ({ message, currentUsername }) => {
  const isMine = message.username === currentUsername;

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message-wrapper ${isMine ? "mine" : "others"}`}>
      <div className="message-content">
        <div className="message-bubble">
          <p className="message-text">{message.text}</p>
          <span className="message-time">{formattedTime}</span>
        </div>
        <div className="message-sender">{isMine ? "" : message.username}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
