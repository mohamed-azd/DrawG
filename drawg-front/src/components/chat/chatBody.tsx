import { Messages } from "../../types/types"

export default function ChatBody(props: { currentUserName: string, messages: Messages }) {
    let key = 0

    return (
        <div id="chatBody">
            {
                (props.messages.map(({ message, username }) => {
                    key++
                    const className = username === props.currentUserName ? 'message messageFromUser' : 'message messageFromOther'
                    return (
                        <div key={key} className={className}>
                            <h6>{username}</h6>
                            <p>{message}</p>
                        </div>
                    )
                }))
            }
        </div>
    )
} 