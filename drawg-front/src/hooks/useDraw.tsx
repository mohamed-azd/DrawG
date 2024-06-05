import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../App";

export default function useDraw() {
    const socket = useContext(SocketContext)
    const [canvasData, setCanvasData] = useState<string>(sessionStorage.getItem('canvasData') ?? '')

    useEffect(() => {
        console.log('salut')
        const savedCanvasData = sessionStorage.getItem('canvasData') 
        console.log(savedCanvasData)
        if (savedCanvasData) {
            setCanvasData(savedCanvasData)
        }
    }, [])

    useEffect(() => {
        const handleDrawing = (data: { canvasData: string }) => {
            setCanvasData(data.canvasData)
            sessionStorage.setItem('canvasData', data.canvasData)
        }

        socket.on('isDrawing', handleDrawing)

        return () => {
            socket.off(`isDrawing`, handleDrawing)
        };
    }, [socket, canvasData])

    return canvasData
}