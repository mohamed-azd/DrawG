import { Server } from "socket.io";
import { setupRoomHandlers } from "./roomHandlers";

export function initializeSockets (server: Server) {
    server.on("connection", (socket) => {
        console.log("A user is connected:", socket.id);

        // Reconnect the socket to its room
        if (socket.handshake.query.roomId) {
            const roomId = socket.handshake.query.roomId
            socket.join(`room:${roomId}`)
        }

        // Setup Handlers
        setupRoomHandlers(socket, server);
    });
};