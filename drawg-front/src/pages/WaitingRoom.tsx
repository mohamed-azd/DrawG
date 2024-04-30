import { useLocation } from "react-router-dom";
import { Room } from "../types";
import { socket } from "../App";
import { useEffect, useState } from "react";

export default function WaitingRoom() {
    const location = useLocation()
    const room: Room = location.state.roomInfos
    const [players, setPlayers] = useState(room.players)
    const [nbPlayers, setNbPlayers] = useState(room.nbPlayers)

    useEffect(() => {

        const handlePlayerJoined = (data: any) => {
            alert(`New player joined : ${data.newPlayer}`)
            setPlayers(data.room.players)
            setNbPlayers(data.room.nbPlayers)
        }

        socket.on(`playerJoined`, handlePlayerJoined)

        return () => {
            socket.off('playerJoined', handlePlayerJoined);
        };
    }, [])


    return (
        <p>Players : {players.length} / {nbPlayers}</p>
    )
}