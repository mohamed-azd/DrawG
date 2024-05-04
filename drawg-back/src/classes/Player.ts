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

    hasAlreadyDrawn(): boolean {
        return this.hasDrawn
    }

    becomeDrawer() {
        this.hasDrawn = true
    }

    getData() {
        return {
            username: this.username,
            hasDrawn: this.hasDrawn,
        }
    }
}

export default Player