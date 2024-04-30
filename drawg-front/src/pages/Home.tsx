import { Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Room from "../services/room"
import { socket } from "../App"

export default function Home() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [roomId, setRoomId] = useState('') 
     
    async function createRoom() {
        const room = new Room()
        const response = await room.create(username, 5)
        socket.emit('joinRoom', (response.data.id))
        navigate(`/room/${response.data.id}`, { state: { roomInfos: response.data } })
    }

    async function join() {
        const room = new Room()
        const response = await room.join(username, roomId)
        socket.emit('joinRoom', (response.data.id))
        navigate(`/room/${roomId}`, { state: { roomInfos: response.data } })
    }

  return (
    <div id="homePage" className="d-flex flex-column bg-primary">
      <div id="content" className="d-flex flex-column justify-content-center align-items-center gap-3 bg-secondary">
            <input type="text" name="" id="" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <Button onClick={async () => await createRoom()}>Create room</Button>
            <input type="text" name="" id="" placeholder="Room identifiant" onChange={(e) => setRoomId(e.target.value)}/>
            <Button onClick={async () => await join()}>Join room</Button>
      </div>
    </div>
  )
}
