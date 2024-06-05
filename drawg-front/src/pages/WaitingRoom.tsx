import { useLocation, useNavigate } from "react-router-dom";
import { Room } from "../types";
import { SocketContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import RoomService from "../services/room";

export default function WaitingRoom() {
    const navigate = useNavigate()
    const location = useLocation()
    const socket = useContext(SocketContext)
    const room: Room = location.state.roomInfos
    const username: string = location.state.username
    const [players, setPlayers] = useState(room.players)
    const [nbPlayersMax, setNbPlayersMax] = useState(room.nbPlayersMax)


    async function startGame() {
        const roomService = new RoomService()
        await roomService.startGame(room.id, username)
    }

    useEffect(() => {
        sessionStorage.setItem('roomId', room.id)

        const handlePlayerJoined = (data: any) => {
            alert(`New player joined : ${data.newPlayer.username}`)
            setPlayers(data.room.players)
            setNbPlayersMax(data.room.nbPlayersMax)
        }

        const handleGameStarted = (data: any) => {
            const navigationData = { currentUser: { username: username }, data: data }
            navigate(`/room/${data.room.id}/wordChoice`, { state: navigationData })
        }

        socket.on(`playerJoined`, handlePlayerJoined)
        socket.on(`gameStarted`, handleGameStarted)

        return () => {
            socket.off('playerJoined', handlePlayerJoined);
            socket.off(`gameStarted`, handleGameStarted)
        };
    }, [])


    return (
        <>
            <div id="header" className="d-flex flex-column">
                <p>{username}</p>
                <p>Players : {players.length} / {nbPlayersMax}</p>
            </div>

            {room.owner.username === username ? (
                <Button onClick={async () => await startGame()}>Lancer la partie</Button>
            ) : (
                <p>Wait for {room.owner.username} to start the game</p>
            )}
        </>
    )
}