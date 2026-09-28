import express from 'express';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const clientDirectory = path.resolve(serverDirectory, '../client');

app.use(express.static(clientDirectory));

io.on('connection', (socket) => {
  // console.log('a user connected' , socket.id);
  socket.on('messagefromfrontend' , (msg) => {
    console.log('Message from frontend: ', msg);
    io.emit("messagefrombackend" , `${socket.id}: msg` );
  })
});


server.listen(PORT , ()=>{
    console.log(`Server is running at port http://localhost:${PORT} `);
});
