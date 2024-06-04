import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../App";

export function useDraw() {
    const socket = useContext(SocketContext)
    const [canvasData, setCanvasData] = useState<string>('')

    useEffect(() => {
        const handleDrawing = (data: { canvasData: string }) => {
            setCanvasData(data.canvasData)
        }

        socket.on('isDrawing', handleDrawing)

        return () => {
            socket.off(`isDrawing`, handleDrawing)
        };
    }, [socket, canvasData])

    return canvasData
}