import { useState } from "react"
import { socket } from "../../App"

export default function ChatFooter(props: { roomId: string, username: string }) {
    const [message, setMessage] = useState('')

    function onSend() {
        socket.emit('sendMessage', { roomId: props.roomId, message, username: props.username })
        setMessage('')
    }

    return (
        <div id="chatFooter">
            <input type="text" name="" id="" placeholder="exemple" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="button" onClick={() => onSend()}>Send</button>
        </div>
    )
}