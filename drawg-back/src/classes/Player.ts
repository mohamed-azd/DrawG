class Player {
    private username: string
    private hasDrawn: boolean
    private score: number

    constructor (username: string, hasDrawn?: boolean, score?: number) {
        this.username = username
        this.hasDrawn = hasDrawn ?? false
        this.score = score ?? 0
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

    getScore() {
        return this.score
    }

    setScore(score: number) {
        this.score = score
    }

    getData() {
        return {
            username: this.username,
            hasDrawn: this.hasDrawn,
            score: this.score
        }
    }
}

export default Player