import { Link, useLocation } from "react-router-dom";
import { Room } from "../types";
import useRoomAuthorization from "../hooks/useRoomAuthorization";
import { Button } from "@chakra-ui/react";

export default function GameResultsView() {
    useRoomAuthorization()

    const location = useLocation()
    const room: Room = location.state.room
    room.players = room.players.sort((playerA, playerB) => playerB.score - playerA.score)
    let key = 0

    return (
        <div id="resultsView">
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
            <Button><Link to={'/'}>Go to home</Link></Button>
        </div>
    )
}