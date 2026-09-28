import express from 'express';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const clientDirectory = path.resolve(serverDirectory, '../client');


io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(express.static(clientDirectory));

const PORT = process.env.PORT || 3000;

server.listen(PORT , ()=>{
    console.log(`Server is running at port http://localhost:${PORT} `);
});
