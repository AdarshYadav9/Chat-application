import React from "react";

const TypingIndicator = ({ typingUsers }) => {
  if (!typingUsers || typingUsers.length === 0) return null;

  let text = "";
  if (typingUsers.length === 1) {
    text = `${typingUsers[0]} is typing...`;
  } else if (typingUsers.length === 2) {
    text = `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
  } else {
    text = "Several people are typing...";
  }

  return (
    <div className="typing-indicator">
      <span className="typing-text">{text}</span>
      <div className="dots">
        <span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
