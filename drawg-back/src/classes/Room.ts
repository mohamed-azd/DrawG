import Player from "./Player"

class Room {
    private id: string
    private owner: Player
    private players: Array<Player>
    private nbPlayersMax: number

    constructor(id: string, owner: Player, players: Array<Player>, nbPlayersMax: number) {
        this.id = id
        this.owner = owner
        this.players = players
        this.nbPlayersMax = nbPlayersMax
    }
    
    getData() { 
        return {
            id: this.id,
            owner: this.owner.getData(),
            players: this.players.map((player) => player.getData()),
            nbPlayersMax: this.nbPlayersMax,
        }
    }

    isFull(): boolean {
        return this.players.length === this.nbPlayersMax
    }

    getPlayerByUsername(username: string): Player | undefined {
        const playerFound = this.players.find((player) => player.getUsername() === username)
        return playerFound
    }

    addPlayer(player: Player) {
        this.players.push(player)
    }
}

export default Room