import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function GameView() {
    const location = useLocation()

    useEffect(() => {
        console.log(location.state)
    }, [])

    return (
        <>
        <p>{location.state.username}</p>
        </>
    )

}