import React, { useEffect, useState, useRef } from "react";
import { getMessages } from "../services/api";
import useSocket from "../hooks/useSocket";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({ currentUsername, onLogout }) => {
  const {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    connectionStatus,
    socketError,
    sendSocketMessage,
    sendTyping,
    sendStopTyping,
  } = useSocket(currentUsername);

  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [apiError, setApiError] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    setApiError(null);
    try {
      const response = await getMessages();
      if (response.success) {
        setMessages((prevSocketMessages) => {
          // Merge API messages with socket messages gracefully to prevent dupes
          const historyMap = new Map();
          const msgs = response.data || response.messages || [];
          msgs.forEach(m => historyMap.set(m._id, m));
          prevSocketMessages.forEach(m => historyMap.set(m._id, m));
          return Array.from(historyMap.values()).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        });
      } else {
        setApiError("Unable to load messages.");
      }
    } catch (err) {
      setApiError("Unable to load messages.");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  const handleSendMessage = (text) => {
    sendSocketMessage(text);
  };

  const typingUsersToDisplay = typingUsers.filter((u) => u !== currentUsername);

  return (
    <div className="chat-window">
      <header className="chat-header">
        <div className="header-info">
          <h2>Real-Time Chat</h2>
          <div className="status-indicators">
            <span className={`status-dot ${connectionStatus === "Connected" ? "connected" : "disconnected"}`}></span>
            <span>{connectionStatus}</span>
          </div>
        </div>
        <div className="header-stats">
          <span>You: <strong>{currentUsername}</strong></span>
          <span>Online: {onlineUsers.length}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      {socketError && (
        <div className="error-banner">
          {socketError}
        </div>
      )}
      {apiError && (
        <div className="error-banner">
          {apiError} <button onClick={fetchHistory}>Retry</button>
        </div>
      )}

      <main className="messages-area">
        {isLoadingHistory ? (
          <div className="loading-state">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">💬</span>
            <h3>No messages yet</h3>
            <p>Start the conversation by sending a message.</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg) => (
              <MessageBubble
                key={msg._id || msg.timestamp}
                message={msg}
                currentUsername={currentUsername}
              />
            ))}
            {typingUsersToDisplay.length > 0 && (
              <TypingIndicator typingUsers={typingUsersToDisplay} />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <footer className="chat-footer">
        <MessageInput
          onSendMessage={handleSendMessage}
          onTyping={sendTyping}
          onStopTyping={sendStopTyping}
        />
      </footer>
    </div>
  );
};

export default ChatWindow;
