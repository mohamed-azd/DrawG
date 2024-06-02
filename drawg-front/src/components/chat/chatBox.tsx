import ChatBody from "./chatBody";
import ChatFooter from "./chatFooter";
import { Messages } from "../../types/types";

export default function ChatBox(props: { roomId: string, currentUser: { username: string }, messages: Messages }) {
    return (
        <div id="chatBox">
            <div id="chatTitle">
                <h2>Chat</h2>
            </div>
            <ChatBody currentUserName={props.currentUser.username} messages={props.messages}></ChatBody>
            <ChatFooter roomId={props.roomId} username={props.currentUser.username}></ChatFooter>
        </div>
    )
}