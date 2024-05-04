import Player from "./Player"

class Room {
    private id: string
    private owner: Player
    private players: Array<Player>
    private nbPlayersMax: number
    private isPlaying: boolean

    constructor(id: string, owner: Player, players: Array<Player>, nbPlayersMax: number, isPlaying?: boolean) {
        this.id = id
        this.owner = owner
        this.players = players
        this.nbPlayersMax = nbPlayersMax
        this.isPlaying = isPlaying ?? false
    }
    
    getData() { 
        return {
            id: this.id,
            owner: this.owner.getData(),
            players: this.players.map((player) => player.getData()),
            nbPlayersMax: this.nbPlayersMax,
            isPlaying: this.isPlaying
        }
    }

    isCurrentlyPlaying(): boolean {
        return this.isPlaying
    }

    setIsPlaying(value: boolean) {
        this.isPlaying = value
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

    defineDrawer(): Player | undefined {
        let drawer
        for (let player of this.players) {
            if (!player.hasAlreadyDrawn()) {
                player.becomeDrawer()
                drawer = player
                break
            }
        }
        return drawer
    }
}

export default Room