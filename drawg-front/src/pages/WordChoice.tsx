import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { WordList } from "../components/wordList"
import RoomService from "../services/room"
import { socket } from "../App"

export function WordChoice() {
    const navigate = useNavigate()
    const location = useLocation()
    const words: Array<string> = location.state.data.words
    const drawer = location.state.data.drawer
    const currentUser = location.state.currentUser
    const room = location.state.data.room

    async function onChoose(word: string) {
        const roomService = new RoomService()
        await roomService.chooseWord(room.id, word)
    }

    useEffect(() => {
        const handleRoundStarted = (data: any) => {
            let navigationData = { currentUser, drawer, room }
            navigate(`/room/${data.room.id}/game`, { state: navigationData })
        }

        socket.on(`roundStarted`, handleRoundStarted)

        return () => {
            socket.off(`roundStarted`, handleRoundStarted)
        };
    }, [])

    return (
        <>
        {currentUser.username === drawer.username ? 
        (
        <div id="words">
            <WordList words={words} onChoose={onChoose}></WordList>
        </div>
        )
         : (
            <p>{drawer.username} has to choose a word...</p>
         )
        }
        </>
    )

}