import { useLocation } from "react-router-dom";
import { Room } from "../types";
import { socket } from "../App";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import RoomService from "../services/room";

export default function WaitingRoom() {
    const location = useLocation()
    const room: Room = location.state.roomInfos
    const username: string = location.state.username
    const [players, setPlayers] = useState(room.players)
    const [nbPlayersMax, setNbPlayersMax] = useState(room.nbPlayersMax)


    async function launchGame() {
        const roomService = new RoomService()
        const data = await roomService.launchGame(room.id)
    }

    useEffect(() => {
        const handlePlayerJoined = (data: any) => {
            alert(`New player joined : ${data.newPlayer.username}`)
            setPlayers(data.room.players)
            setNbPlayersMax(data.room.nbPlayersMax)
        }

        socket.on(`playerJoined`, handlePlayerJoined)

        return () => {
            socket.off('playerJoined', handlePlayerJoined);
        };
    }, [])


    return (
        <>
            <div id="header" className="d-flex flex-column">
                <p>{username}</p>
                <p>Players : {players.length} / {nbPlayersMax}</p>
            </div>

            {room.owner.username === username ? (
                <Button onClick={async () => await launchGame()}>Lancer la partie</Button>
            ) : (
                <p>Wait for {room.owner.username} to start the game</p>
            )}
        </>
    )
}