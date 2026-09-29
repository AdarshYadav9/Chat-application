# Real-Time Chat App 💬

Welcome to the Real-Time Chat App! This is a full-stack chat application built using Node.js, Express, and React. It's designed to be fast, responsive, and (most importantly) completely real-time! 🚀

## What can it do?
- **Instant Messaging:** Powered by Socket.io, messages pop up on your screen the exact second they are sent. No refreshing needed.
- **"Someone is typing..." Indicators:** See when your friends are typing out a reply in real-time.
- **Live User Counts:** Always know how many people are hanging out in the chat room.
- **Chat History:** If you close the tab and come back, your previous messages will still be there waiting for you. (Thanks to MongoDB!)
- **Looks Great Anywhere:** Built with a custom, responsive layout so it feels like a native app on your phone, tablet, or laptop.

## What's under the hood? 🛠️

**Frontend (`client/`):**
- **React** (powered by Vite for super fast builds)
- **Socket.io-client** (for that sweet real-time connection)
- **Axios** (for fetching old messages)
- **Vanilla CSS** (keeping it lightweight with no bulky UI frameworks)

**Backend (`server/`):**
- **Node.js & Express** (the backbone of the server)
- **Socket.io** (the real-time engine)
- **MongoDB & Mongoose** (where all the messages are saved)

---

## Want to run it yourself? Here's how!

### 1. Grab the dependencies
First, you'll need to install the packages for both the backend and frontend. Open up two terminal windows.

**In Terminal 1:**
```bash
cd server
npm install
```

**In Terminal 2:**
```bash
cd client
npm install
```

### 2. Set up your environment variables
You'll need a MongoDB database to save the messages. Once you have a connection string (like one from MongoDB Atlas), set up your `.env` files.

**In the `server/` folder**, create a `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string_goes_here
CLIENT_URL=http://localhost:5173
```

**In the `client/` folder**, create another `.env` file:
```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### 3. Start it up! 🎉

Start the backend (Terminal 1):
```bash
npm run dev
```

Start the frontend (Terminal 2):
```bash
npm run dev
```

Now, just open your browser and head over to `http://localhost:5173`!

---

### 💡 Pro Tip for Testing
Want to test the real-time features on your own? 
1. Open `http://localhost:5173` in your normal browser, pick a username, and join the chat. 
2. Open up an **Incognito/Private window**, pick a different name, and join. 
3. Try chatting back and forth between the two windows—you'll see the typing indicators, online user counts, and messages sync up instantly!
