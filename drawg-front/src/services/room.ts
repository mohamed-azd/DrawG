import Service from "./service";

class Room extends Service {
    constructor() {
        super()
    }

    async create(username: string, nbPlayers: number) {
        const data = { username: username, nbPlayers: nbPlayers }
        return await this.call('POST', '/room', data)
    }
}

export default Room