import {
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';
import { ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { CreateRoomPopupProps } from '../types';

export default function CreatePopup(props: CreateRoomPopupProps) {
	return (
		<Modal isCentered={true} size={'xl'} isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent p={5} bg={'primary'}>
				<div id="createPopupContent">
					<ModalHeader>
						<h4 id="createPopupTitle">Setup your room</h4>
					</ModalHeader>
					<ModalCloseButton color={'secondary'}></ModalCloseButton>
					<ModalBody id="createPopupBody">
						<label id="nbPlayerLbl">Number of players</label>
						<NumberInput
							bg={'white'}
							min={2}
							defaultValue={5}
							size={'sm'}
							onChange={(strValue, nbValue) => props.onNbPlayersChange(nbValue)}
							rounded={'lg'}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</ModalBody>
					<ModalFooter>
						<Button bg={'secondary'} color={'primary'} onClick={async () => await props.onCreate()}>
							Create
						</Button>
					</ModalFooter>
				</div>
			</ModalContent>
		</Modal>
	);
}
