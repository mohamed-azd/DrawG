export type CreateRoom = {
    username: string,
    nbPlayersMax: number
}

export type Room = {
    id: string,
    owner: string,
    players: Array<string>,
    nbPlayersMax: number
} | null