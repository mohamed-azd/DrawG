export type Room = {
	id: string;
	owner: Player;
	players: Array<Player>;
	nbPlayersMax: number;
	isPlaying: boolean;
	wordToGuess: string;
};

export type Player = {
	username: string;
	hasDrawn: boolean;
	score: number;
};

export type Message = {
	message: string;
	username: string;
};

export type Messages = Array<Message>;

export type CreateRoomPopupProps = {
	isOpen: boolean;
	onClose: () => void;
	onCreate: () => Promise<void>;
	onNbPlayersChange: (value: number) => void;
};
