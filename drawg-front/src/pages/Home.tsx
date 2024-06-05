import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../App"
import RoomService from "../services/room"
import { Input, Button, useDisclosure } from "@chakra-ui/react"
import { Logo } from "../components/logo"
import JoinPopup from "../components/JoinPopup"

export default function Home() {
  const navigate = useNavigate()
  const socket = useContext(SocketContext)
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function createRoom() {
    const room = new RoomService()
    const response = await room.create(username, 5)
    socket.emit('joinRoom', (response.data.id))
    sessionStorage.setItem('roomId', response.data.id)
    navigate(`/room/${response.data.id}`, { state: { roomInfos: response.data, username: username } })
  }

  async function join() {
    const room = new RoomService()
    const response = await room.join(username, roomId)
    socket.emit('joinRoom', (response.data.id))
    sessionStorage.setItem('roomId', response.data.id)
    navigate(`/room/${roomId}`, { state: { roomInfos: response.data, username: username } })
  }

  useEffect(() => {
    sessionStorage.clear()
  }, [])

  return (
    <div id="homePage">
      <Logo></Logo>
      <div id="homeContent">
        <div id="homeInputs">
          <h4>Enter your name</h4>
          <Input bg={"white"} placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Input>
          <JoinPopup isOpen={isOpen} onClose={onClose} onInputChange={setRoomId} onJoin={join}></JoinPopup>
          <div id="homeButtons">
            <Button color={"secondary"} bg={"primary"} onClick={async () => await createRoom()}>Create room</Button>
            <Button color={"primary"} bg={"secondary"} onClick={onOpen}>Join room</Button>
          </div>
        </div>
      </div>

    </div>
  )
}
