import { useContext } from 'react';
import ChatSelect from '../components/ChatSelect';
import InboxPeople from '../components/InboxPeople';
import Messages from '../components/Messages';
import { ChatContext } from '../context/chat/ChatContext';
import '../css/chat.css';

export default function ChatPage() {

    const { chatState } = useContext(ChatContext);

    return (
        <div className="messaging">
            <div className="inbox_msg">  
                <InboxPeople /> 
                {/* <ChatSelect /> */}
                {
                    ( chatState.activeChat ) 
                        ? <Messages />
                        : <ChatSelect />
                }
                {/* <Messages />  */}
            </div> 
        </div>
    )
}