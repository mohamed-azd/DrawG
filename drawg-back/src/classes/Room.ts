import Player from "./Player";

class Room {
  private id: string;
  private owner: Player;
  private players: Array<Player>;
  private nbPlayersMax: number;
  private isPlaying: boolean;
  private wordToGuess?: string;

  constructor(id: string, owner: Player, players: Array<Player>, nbPlayersMax: number, isPlaying?: boolean, wordToGuess?: string) {
    this.id = id;
    this.owner = owner;
    this.players = players;
    this.nbPlayersMax = nbPlayersMax;
    this.isPlaying = isPlaying ?? false;
    this.wordToGuess = wordToGuess;
  }

  getData() {
    const data: any = {
      id: this.id,
      owner: this.owner.getData(),
      players: this.players.map((player) => player.getData()),
      nbPlayersMax: this.nbPlayersMax,
      isPlaying: this.isPlaying,
    };

    if (this.wordToGuess) data["wordToGuess"] = this.wordToGuess;

    return data;
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  setIsPlaying(value: boolean) {
    this.isPlaying = value;
  }

  isFull(): boolean {
    return this.players.length === this.nbPlayersMax;
  }

  getPlayerByUsername(username: string): Player | undefined {
    const playerFound = this.players.find((player) => player.getUsername() === username);
    return playerFound;
  }

  getPlayers(): Array<Player> {
    return this.players;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  defineDrawer(): Player | undefined {
    let drawer;
    for (let player of this.players) {
      if (!player.hasAlreadyDrawn()) {
        player.becomeDrawer();
        drawer = player;
        break;
      }
    }
    return drawer;
  }

  setWordToGuess(word: string) {
    this.wordToGuess = word;
  }

  guess(word: string, playerUsername: string): boolean {
    if (word.toLowerCase() === this.wordToGuess?.toLowerCase()) {
        this.players.forEach((player) => {
            if (player.getUsername() === playerUsername) {
                player.setScore(player.getScore() + 10)
            }
        })
        return true;
    } else {
      return false;
    }
  }
}

export default Room;
