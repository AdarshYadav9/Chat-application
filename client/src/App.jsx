import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [inputUsername, setInputUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("chat_username");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsJoined(true);
    }
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmed = inputUsername.trim();
    if (trimmed && trimmed.length <= 30) {
      setUsername(trimmed);
      localStorage.setItem("chat_username", trimmed);
      setIsJoined(true);
    }
  };

  if (!isJoined) {
    return (
      <div className="login-container">
        <form className="login-box" onSubmit={handleJoin}>
          <h2>Real-Time Chat</h2>
          <p>Enter your username</p>
          <input
            type="text"
            placeholder="Adarsh"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            maxLength={30}
            required
            autoFocus
          />
          <button type="submit" disabled={!inputUsername.trim()}>Join Chat</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ChatWindow currentUsername={username} onLogout={() => {
        localStorage.removeItem("chat_username");
        setIsJoined(false);
        setUsername("");
        setInputUsername("");
      }} />
    </div>
  );
}

export default App;
