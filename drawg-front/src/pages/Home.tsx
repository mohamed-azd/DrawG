import { Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Room from "../services/room"

export default function Home() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
     
    async function createRoom() {
        const room = new Room()
        const response = await room.create(username, 5)
        navigate(`/room/${response.data.id}`, { state: { roomInfos: response.data } })
    }

  return (
    <div id="homePage" className="d-flex flex-column bg-primary">
      <div id="content" className="d-flex flex-column justify-content-center align-items-center gap-3 bg-secondary">
        <input type="text" name="" id="" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <Button onClick={async () => await createRoom()}>Create room</Button>
            <Button>Join room</Button>
      </div>
    </div>
  )
}
