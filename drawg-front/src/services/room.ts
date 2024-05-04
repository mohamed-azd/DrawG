import Service from "./service";

class RoomService extends Service {
    constructor() {
        super()
    }

    async create(username: string, nbPlayersMax: number) {
        const data = { username: username, nbPlayersMax: nbPlayersMax }
        return await this.call('POST', '/room', data)
    }

    async join(username: string, roomId: string) {
        const data = { username: username }
        return await this.call('POST', `/room/${roomId}/join`, data)
    }

    async startGame(roomId: string, username: string) {
        return await this.call('POST', `/room/${roomId}/start`, { username })
    }
}

export default RoomService