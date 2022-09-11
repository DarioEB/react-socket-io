import SendMessage from "./SendMessage";
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from "./OutgoingMessage";
import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";
const Messages = () => {

    const { chatState } = useContext(ChatContext)
    const { auth  } = useContext( AuthContext);

    // console.log(auth.uid);

    return (
        <div className="mesgs">
            <div className="msg_history" id="messages">
                { chatState.messages.map( (message, index) => (
                    ( message.to === auth.uid ) 
                        ? <IncomingMessage key={index} message={message} />
                        : <OutgoingMessage key={index} message={message} />
                ))}
                {/* <IncomingMessage /> */}
                {/* <OutgoingMessage /> */}
            </div>
            <SendMessage />
        </div>
    )
}

export default Messages;