export type CreateRoom = {
    username: string,
    nbPlayersMax: number
}

export type PlayerFromRedis = {
    username: string,
    hasDrawn: boolean
}

export type RoomFromRedis = {
    id: string,
    owner: PlayerFromRedis,
    players: Array<PlayerFromRedis>,
    nbPlayersMax: number,
    isPlaying: boolean,
}