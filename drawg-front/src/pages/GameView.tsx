import { useLocation } from "react-router-dom"

export function GameView() {
    const location = useLocation()
    console.log(location.state)

    return (
        <>
        </>
    )

}