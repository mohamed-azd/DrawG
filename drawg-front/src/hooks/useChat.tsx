import { useContext, useEffect, useState } from "react";
import { Messages } from "../types";
import { SocketContext } from "../App";

export default function useChat() {
    const socket = useContext(SocketContext)
    const [messages, setMessages] = useState<Messages>([])

    useEffect(() => {
        console.log('useEffect message')
        const handleReceiveMessage = (data: { message: string, username: string }) => {
            setMessages(prevMessages => [...prevMessages, data])
        }

        socket.on('receiveMessage', handleReceiveMessage)

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, [socket, messages])

    return messages
}