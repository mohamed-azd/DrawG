import { useLocation } from "react-router-dom"
import MyCanvas from "../components/myCanvas"
import { useEffect, useState } from "react"
import { socket } from "../App"
import { Room } from "../types"

export function GameView() {
    const location = useLocation()
    const [canvasData, setCanvasData] = useState('')
    const room: Room = location.state.room
    const currentUser = location.state.currentUser
    const drawer = location.state.drawer

    useEffect(() => {
        socket.on('isDrawing', (data: any) => {
            if (currentUser.username !== drawer.username) {
                setCanvasData(data.canvasData)
            }
        })
    }, [canvasData])


    return (
        <>
            <div id="draw-container">
                <MyCanvas data={canvasData} roomId={room.id} isDrawer={currentUser.username === drawer.username}></MyCanvas>
            </div>
        </>
    )

}