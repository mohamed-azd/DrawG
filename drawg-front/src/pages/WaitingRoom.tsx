import { useLocation } from "react-router-dom";
import { Room } from "../types";

export default function WaitingRoom() {
    const location = useLocation()
    const room: Room = location.state.roomInfos

    return (
        <p>Players : {room.players.length} / {room.nbPlayers}</p>
    )
}