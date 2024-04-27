export type CreateLobby = {
    username: string,
    nbPlayers: number
}

export type Lobby = {
    id: string,
    owner: string,
    players: Array<string>,
    nbPlayers: number
} | null