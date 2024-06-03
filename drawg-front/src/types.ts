export type Room = {
    id: string,
    owner: Player,
    players: Array<Player>,
    nbPlayersMax: number
}

export type Player = {
    username: string,
    hasDrawn: boolean
}

export type Message = {
    message: string,
    username: string
}

export type Messages = Array<Message>