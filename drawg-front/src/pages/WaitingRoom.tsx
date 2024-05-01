import { useLocation } from "react-router-dom";
import { Room } from "../types";
import { socket } from "../App";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function WaitingRoom() {
    const location = useLocation()
    const room: Room = location.state.roomInfos
    const username: string = location.state.username
    const [players, setPlayers] = useState(room.players)
    const [nbPlayersMax, setNbPlayersMax] = useState(room.nbPlayersMax)

    useEffect(() => {

        const handlePlayerJoined = (data: any) => {
            alert(`New player joined : ${data.newPlayer}`)
            setPlayers(data.room.players)
            setNbPlayersMax(data.room.nbPlayersMax)
        }

        socket.on(`playerJoined`, handlePlayerJoined)

        return () => {
            socket.off('playerJoined', handlePlayerJoined);
        };
    }, [])


    return (
        <p>Players : {players.length} / {nbPlayersMax}</p>
    )
}