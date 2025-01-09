import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../App';
import RoomService from '../services/room';
import { Input, Button, useDisclosure } from '@chakra-ui/react';
import { Logo } from '../components/logo';
import JoinPopup from '../components/JoinPopup';
import CreatePopup from '../components/CreatePopup';

export default function Home() {
	const navigate = useNavigate();
	const socket = useContext(SocketContext);
	const [username, setUsername] = useState('');
	const [roomId, setRoomId] = useState('');
	const [nbPlayers, setNbPlayers] = useState(5);
	const { isOpen: isJoinPopupOpen, onOpen: onJoinPopupOpen, onClose: onJoinPopupClose } = useDisclosure();
	const { isOpen: isCreatePopupOpen, onOpen: onCreatePopupOpen, onClose: onCreatePopupClose } = useDisclosure();

	async function createRoom() {
		const room = new RoomService();
		const response = await room.create(username, nbPlayers);
		socket.emit('joinRoom', response.data.id);
		sessionStorage.setItem('roomId', response.data.id);
		navigate(`/room/${response.data.id}`, { state: { roomInfos: response.data, username: username } });
	}

	async function join() {
		const room = new RoomService();
		const response = await room.join(username, roomId);
		socket.emit('joinRoom', response.data.id);
		sessionStorage.setItem('roomId', response.data.id);
		navigate(`/room/${roomId}`, { state: { roomInfos: response.data, username: username } });
	}

	useEffect(() => {
		sessionStorage.clear();
	}, []);

	return (
		<div id="homePage">
			<Logo></Logo>
			<div id="homeContent">
				<div id="homeInputs">
					<h4>Enter your name</h4>
					<Input bg={'white'} placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Input>
					<div id="homeButtons">
						<Button color={'secondary'} bg={'primary'} onClick={onCreatePopupOpen}>
							Create room
						</Button>
						<Button color={'primary'} bg={'secondary'} onClick={onJoinPopupOpen}>
							Join room
						</Button>
					</div>
				</div>
				<JoinPopup isOpen={isJoinPopupOpen} onClose={onJoinPopupClose} onInputChange={setRoomId} onJoin={join}></JoinPopup>
				<CreatePopup onNbPlayersChange={setNbPlayers} isOpen={isCreatePopupOpen} onClose={onCreatePopupClose} onCreate={createRoom}></CreatePopup>
			</div>
		</div>
	);
}
