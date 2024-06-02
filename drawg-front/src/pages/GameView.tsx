import { useLocation } from "react-router-dom"
import MyCanvas from "../components/myCanvas"
import { useEffect, useState } from "react"
import { socket } from "../App"
import { Room } from "../types"
import ChatBox from "../components/chat/chatBox"
import { Messages } from "../types/types"

export function GameView() {
    const location = useLocation()
    const [canvasData, setCanvasData] = useState('')
    const [messages, setMessages] = useState<Messages>([])
    const room: Room = location.state.room
    const { currentUser, drawer, wordToGuess } = location.state

    useEffect(() => {
        console.log('useEffect draw')
        const handleDrawing = (data: any) => {
            setCanvasData(data.canvasData)
        }

        socket.on('isDrawing', handleDrawing)

        return () => {
            socket.off(`isDrawing`, handleDrawing)
        };
    }, [socket])

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


    return (
        <div id="game">
                <h2 id="wordToGuess">{wordToGuess}</h2>
            <div id="gameView">
                <div id="draw-container">
                    <MyCanvas data={canvasData} roomId={room.id} isDrawer={currentUser.username === drawer.username}></MyCanvas>
                </div>

                <div id="chat-container">
                    <ChatBox messages={messages} roomId={room.id} currentUser={currentUser}></ChatBox>
                </div>
            </div>
        </div>
    )

}