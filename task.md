# Real-Time Chat Application Implementation Details

This document outlines the complete implementation details for the real-time chat application, encompassing both the Node.js backend and the React (Vite) frontend.

## 1. Backend (`server/`)
The backend is built with **Node.js, Express, MongoDB (Mongoose), and Socket.io**, providing a robust REST API alongside real-time bi-directional communication.

### Architecture & Files:
*   **`server.js`**: The main entry point. Orchestrates the Express server, HTTP server, CORS policies, Socket.io initialization, and global error handling.
*   **`config/db.js`**: Handles connecting to the MongoDB database using Mongoose.
*   **`models/Message.js`**: Defines the Mongoose schema for chat messages, strictly validating `username`, `text`, and automatically applying a `timestamp`.
*   **`routes/messageRoutes.js` & `controllers/messageController.js`**: 
    *   `GET /api/messages`: Retrieves the last 100 messages chronologically to populate chat history on load.
    *   `POST /api/messages`: A fallback HTTP route to send messages.
*   **`socket/socketHandler.js`**: The core real-time engine. Manages:
    *   `joinChat`: Maps a user's `socket.id` to their chosen username.
    *   `sendMessage`: Receives a message, saves it securely to MongoDB, and then broadcasts the `receiveMessage` event with the DB document back to all connected clients.
    *   `typing` & `stopTyping`: Broadcasts typing indicators to other users.
    *   `disconnect`: Safely handles user drop-offs, updating the globally broadcasted `onlineUsers` list.

## 2. Frontend (`client/`)
The frontend is a fast, responsive Single Page Application built with **React, Vite, Axios, and Socket.io-client**.

### Architecture & Components:
*   **`src/App.jsx`**: Handles the entry logic and a lightweight "Login" screen to capture and persist the user's chosen username in `localStorage`.
*   **`src/components/ChatWindow.jsx`**: The primary chat interface. It fetches initial history via REST API, seamlessly merges it with incoming live Socket messages (preventing duplicates), and automatically scrolls to the bottom on new messages.
*   **`src/components/MessageBubble.jsx`**: Renders individual chat messages dynamically aligning them right (for the current user) or left (for others).
*   **`src/components/MessageInput.jsx`**: The text area for writing messages. Includes logic to detect typing (with a 1.5s debounce to trigger `stopTyping`) and supports pressing "Enter" to send.
*   **`src/components/TypingIndicator.jsx`**: A subtle UI component showing animated dots when other users are currently typing.
*   **`src/hooks/useSocket.js`**: A custom React Hook that abstracts away all Socket.io complexities. It binds and unbinds event listeners safely on component mount/unmount to guarantee no duplicate listener memory leaks occur.
*   **`src/services/api.js` & `src/services/socket.js`**: Singleton services utilizing environment variables (`VITE_API_URL`, `VITE_SOCKET_URL`) to connect to the backend.

### Styling (`src/index.css`):
*   Fully responsive, fluid design matching modern developer chat apps.
*   Distinct coloring for sent vs. received messages.
*   Flexbox-driven layout preventing full-page scrolling, keeping the input fixed at the bottom.
*   Visual indicators for server connection status (Connected, Disconnected, Connecting).

## 3. Real-Time Flow
1.  **Load**: Frontend mounts, fetches history (`GET /api/messages`), and connects to Socket.io.
2.  **Type**: User types -> emits `typing` -> other clients see indicator.
3.  **Send**: User submits -> emits `sendMessage` -> Backend validates & saves to MongoDB -> Backend emits `receiveMessage` -> All clients append message & auto-scroll.

## 4. Run Instructions
*   **Backend**: `cd server && npm run dev` (Runs on port 3000)
*   **Frontend**: `cd client && npm run dev` (Runs on port 5173)
