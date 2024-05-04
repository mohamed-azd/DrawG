import { Server } from "socket.io";
import { setupRoomHandlers } from "./roomHandlers";

export function initializeSockets (server: Server) {
    server.on("connection", (socket) => {
        console.log("A user is connected:", socket.id);

        // Setup Handlers
        setupRoomHandlers(socket, server);
    });
};