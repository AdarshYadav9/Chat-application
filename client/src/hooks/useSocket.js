import { useEffect, useState, useCallback } from "react";
import socket from "../services/socket";

const useSocket = (username) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    if (!username) return;

    socket.connect();
    setConnectionStatus("Connecting...");

    const onConnect = () => {
      setConnectionStatus("Connected");
      setSocketError(null);
      socket.emit("joinChat", { username });
    };

    const onDisconnect = () => {
      setConnectionStatus("Disconnected");
    };

    const onConnectError = (err) => {
      setConnectionStatus("Disconnected");
      setSocketError("Unable to connect to the chat server.");
    };

    const onReceiveMessage = (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) {
          return prev;
        }
        return [...prev, message];
      });
    };

    const onOnlineUsers = (data) => {
      if (data && data.users) {
        setOnlineUsers(data.users);
      }
    };

    const onUserOnline = (data) => {
      setOnlineUsers((prev) => {
        if (!prev.includes(data.username)) {
          return [...prev, data.username];
        }
        return prev;
      });
    };

    const onUserOffline = (data) => {
      setOnlineUsers((prev) => prev.filter((user) => user !== data.username));
    };

    const onTyping = (data) => {
      setTypingUsers((prev) => {
        if (!prev.includes(data.username)) {
          return [...prev, data.username];
        }
        return prev;
      });
    };

    const onStopTyping = (data) => {
      setTypingUsers((prev) => prev.filter((user) => user !== data.username));
    };

    const onError = (data) => {
      setSocketError(data.message || "Socket error occurred");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("receiveMessage", onReceiveMessage);
    socket.on("onlineUsers", onOnlineUsers);
    socket.on("userOnline", onUserOnline);
    socket.on("userOffline", onUserOffline);
    socket.on("typing", onTyping);
    socket.on("stopTyping", onStopTyping);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("onlineUsers", onOnlineUsers);
      socket.off("userOnline", onUserOnline);
      socket.off("userOffline", onUserOffline);
      socket.off("typing", onTyping);
      socket.off("stopTyping", onStopTyping);
      socket.off("error", onError);
      socket.disconnect();
    };
  }, [username]);

  const sendSocketMessage = useCallback((text) => {
    if (socket.connected) {
      socket.emit("sendMessage", { username, text });
    }
  }, [username]);

  const sendTyping = useCallback(() => {
    if (socket.connected) {
      socket.emit("typing", { username });
    }
  }, [username]);

  const sendStopTyping = useCallback(() => {
    if (socket.connected) {
      socket.emit("stopTyping", { username });
    }
  }, [username]);

  return {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    connectionStatus,
    socketError,
    sendSocketMessage,
    sendTyping,
    sendStopTyping
  };
};

export default useSocket;
