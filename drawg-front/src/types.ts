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