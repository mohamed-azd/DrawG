import express from "express";
import routes from "./src/routes/index";
import { Server } from "socket.io";
import cors from "cors";
import http from 'http';
import { initializeSockets } from "./src/sockets";
import { Redis } from "ioredis";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const server = http.createServer(app)

export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});
 
const REDIS_HOST = process.env.REDIS_HOST

export const redis = new Redis({
    host: REDIS_HOST
})

initializeSockets(io)


server.listen(3000, () => {
    console.log('Back launched')
})
