import axios from "axios"

class Service {
    private serverUrl: string

    constructor() {
        this.serverUrl = 'http://localhost:3000'
    }

    async call(method: string, route: string, data = {}) {
        return await axios({
            method: method,
            url: `${this.serverUrl}${route}`,
            data: data
        })
    }
}

export default Service