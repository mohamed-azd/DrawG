import { Server, Socket } from "socket.io";

export function setupRoomHandlers (socket: Socket, io: Server) {
    socket.on('joinRoom', (roomId: string) => {
        socket.join(`room:${roomId}`)
        console.log(`Socket ${socket.id} has joined room ${roomId}`)
    })
}