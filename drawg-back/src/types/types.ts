export type CreateRoom = {
    username: string,
    nbPlayers: number
}

export type Room = {
    id: string,
    owner: string,
    players: Array<string>,
    nbPlayers: number
} | null