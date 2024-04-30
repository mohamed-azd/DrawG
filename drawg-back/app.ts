import express from "express";
import routes from "./src/routes/index";
import { Server } from "socket.io";
import cors from "cors";
import http from 'http';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const server = http.createServer(app)

export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});
 
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on('joinRoom', (roomId: string) => {
    socket.join(`room:${roomId}`)
    console.log(`Socket ${socket.id} has joined room ${roomId}`)
  })
});


server.listen(3000, () => {
    console.log('Back launched')
})
