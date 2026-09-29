# Real-Time Chat App 💬

A full-stack, real-time chat application built with **React + Node.js + Express + Socket.io + MongoDB**. Messages are delivered instantly via WebSockets — no polling, no page reloads.

---
## deployed Link 

Github Link : https://chat-application-pi-sooty.vercel.app/
Render Link : https://chat-application-yb0g.onrender.com/

## 🌟 Features

- **Instant Messaging** — WebSocket-powered via Socket.io; zero-latency delivery
- **Typing Indicators** — Live feedback when others are composing a message
- **Online User Presence** — Real-time connection status and active user count
- **Persistent Chat History** — Previous messages load from MongoDB on reconnect
- **Premium Responsive UI** — Mobile-first design with glassmorphism, gradients, and custom SVG icons
- **Username-based Login** — Lightweight dummy authentication to identify users
- **Graceful Error Handling** — Socket disconnections and API errors handled cleanly

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Axios, Socket.io-client, Vanilla CSS3 |
| Backend | Node.js, Express.js, Socket.io |
| Database | MongoDB (via Mongoose) |
| Dev Tooling | dotenv, cors, nodemon |

---

## 📁 Project Structure

```
chat_application/
├── client/                       # React Frontend
│   ├── public/                   # Static assets
│   └── src/
│       ├── components/           # Reusable UI components (ChatWindow, MessageBubble, etc.)
│       ├── hooks/                # Custom hooks (e.g., useSocket)
│       ├── services/             # Axios API service layer
│       ├── App.jsx               # Root component
│       ├── index.css             # Global stylesheet
│       └── main.jsx              # React DOM entry point
│
└── server/                       # Node.js/Express Backend
    ├── config/
    │   └── db.js                 # MongoDB connection setup
    ├── controllers/
    │   └── messageController.js  # REST API logic
    ├── models/
    │   └── Message.js            # Mongoose schema
    ├── routes/
    │   └── messageRoutes.js      # Express routes
    ├── sockets/
    │   └── socketHandler.js      # Socket.io event handlers
    └── index.js                  # Server entry point
```

---

## 🔌 REST API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/messages` | Fetch full chat history |
| `POST` | `/api/messages` | Persist a new message |

---

## 📡 Socket.io Events

| Event | Direction | Description |
|---|---|---|
| `connection` | Client → Server | User connects to the server |
| `user_join` | Client → Server | User submits their username and joins the chat |
| `send_message` | Client → Server | Sends message payload (text, username, timestamp) |
| `typing` | Client → Server | User is actively typing |
| `stop_typing` | Client → Server | User stopped typing |
| `receive_message` | Server → Client | Broadcasts a new saved message to all clients |
| `update_users` | Server → Client | Sends the current array of online users |
| `user_typing` | Server → Client | Broadcasts the list of currently typing users |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) free cluster

### 1. Clone the Repository

```bash
git clone https://github.com/AdarshYadav9/Chat-application.git
cd Chat-application
```

### 2. Install Dependencies

Open two terminals — one for the backend, one for the frontend.

**Terminal 1 — Backend:**
```bash
cd server
npm install
```

**Terminal 2 — Frontend:**
```bash
cd client
npm install
```

### 3. Configure Environment Variables

**`server/.env`**
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string_here
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

> Replace `your_mongodb_connection_string_here` with your actual MongoDB URI.  
> For Atlas, it looks like: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/chatdb`

### 4. Run the Application

**Terminal 1 — Start the backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Start the frontend:**
```bash
cd client
npm run dev
```

Open your browser at **`http://localhost:5173`**

---

## 🧪 Testing Real-Time Features Locally

1. Open `http://localhost:5173` in your main browser window — enter a username (e.g. **Alice**) and join the chat.
2. Open a second **Incognito / Private window** (or a different browser) — enter a different username (e.g. **Bob**) and join.
3. Send messages between the two windows. You'll see:
   - Instant message delivery
   - Typing indicators as you type
   - Live online user count updates

---

## 🏗️ Design Decisions

- **Socket.io over polling** — Persistent WebSocket connections provide true real-time delivery with minimal server overhead. Polling was explicitly ruled out.
- **REST + WebSocket hybrid** — REST handles stateful operations (message persistence, history fetch); Socket.io handles ephemeral real-time events (typing, presence). This separation keeps concerns clean.
- **MongoDB for storage** — Schema-flexible NoSQL fits the evolving message payload shape and scales horizontally without complex migrations.
- **Vite over CRA** — Significantly faster HMR and build times during development.
- **Vanilla CSS with CSS variables** — Avoids the weight of a CSS framework while keeping the design system consistent and themeable.
- **Custom `useSocket` hook** — Encapsulates all Socket.io lifecycle logic (connect, disconnect, event listeners) so components stay declarative and free of socket boilerplate.

---

## 📌 Assumptions

- A single global chat room is sufficient for this implementation (no private DMs).
- Username-based identity is ephemeral — no persistent accounts or JWT sessions.
- All connected clients participate in the same room; multi-room support is left to future work.
- The client and server run on the same machine during local development (localhost).
- MongoDB Atlas (or a local instance) is already provisioned before starting the server.

---

## 🔮 Roadmap

- [ ] JWT-based authentication and persistent user accounts
- [ ] Private / direct messaging between users
- [ ] Image and file attachment support
- [ ] Message read receipts
- [ ] Multi-room / channel support
- [ ] Backend deployment (Render / Railway) with live API URL

---

## 📄 License

This project was built as part of a technical assessment. All rights reserved by the author.