import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useRoomAuthorization () {
    const navigate = useNavigate()

    useEffect(() => {
        const roomId = sessionStorage.getItem('roomId')
        if (!roomId) {
            navigate('/')
        }
    }, [])
}