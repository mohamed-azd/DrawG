import { Button, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

export default function JoinPopup(props: { isOpen: boolean, onClose: () => void, onJoin: () => Promise<void>, onInputChange: (value: string) => void }) {
    return (
        <Modal isCentered={true} size={"xl"} isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent p={5} bg={"primary"}>
                <div id="joinPopupContent">
                    <ModalHeader>
                        <h4>Enter a room identifiant</h4>
                    </ModalHeader>
                    <ModalCloseButton color={"secondary"}></ModalCloseButton>
                    <div id="joinPopupBody">
                        <ModalBody>
                            <Input bg={"white"} placeholder="Room identifiant" onChange={(e) => props.onInputChange(e.target.value)}></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button bg={"secondary"} color={"primary"} onClick={async () => await props.onJoin()}>Join</Button>
                        </ModalFooter>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}