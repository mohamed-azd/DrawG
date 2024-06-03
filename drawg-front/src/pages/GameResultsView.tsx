import { useLocation } from "react-router-dom";
import { Room } from "../types";

export default function GameResultsView() {
    const location = useLocation()
    const room: Room = location.state.room
    room.players = room.players.sort((playerA, playerB) => playerB.score - playerA.score)
    let key = 0

    return (
        <div id="results">
            {room.players.map((player) => {
                key++
                return (
                    <div id={`player${key}`} key={key}>
                        <p>Username: {player.username}</p>
                        <p>score: {player.score}</p>
                    </div>
                )
            })}
        </div>
    )
}