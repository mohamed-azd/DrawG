class Player {
    private username: string
    private hasDrawn: boolean

    constructor (username: string, hasDrawn?: boolean) {
        this.username = username
        this.hasDrawn = hasDrawn ?? false
    }

    getUsername(): string {
        return this.username
    }

    /**
     * If a player has already drawn
     */
    hasAlreadyDrawn(): boolean {
        return this.hasDrawn
    }

    getData() {
        return {
            username: this.username,
            hasDrawn: this.hasDrawn,
        }
    }
}

export default Player