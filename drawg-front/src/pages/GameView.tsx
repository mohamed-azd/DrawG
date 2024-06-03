import { useLocation } from "react-router-dom"
import MyCanvas from "../components/myCanvas"
import { useContext } from "react"
import { SocketContext } from "../App"
import { Room } from "../types"
import ChatBox from "../components/chat/chatBox"
import { useDraw } from "../hooks/useDraw"
import useChat from "../hooks/useChat"

export function GameView() {
    const location = useLocation()
    const socket = useContext(SocketContext)
    const canvasData = useDraw()
    const messages = useChat()
    const room: Room = location.state.room
    const { currentUser, drawer, wordToGuess } = location.state

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