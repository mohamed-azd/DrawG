export type Room = {
    id: string,
    owner: string,
    players: Array<string>,
    nbPlayersMax: number
}