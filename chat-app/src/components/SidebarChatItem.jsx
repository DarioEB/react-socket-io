import { useContext } from 'react';
import { ChatContext } from "../context/chat/ChatContext"
import { types } from '../types';
import { fetchToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
const SidebarChatItem = ({user}) => {

    const {
        dispatch,
        chatState 
    } = useContext(ChatContext); 
    const { activeChat } = chatState;

    const handleClick = async ( ) => {
        dispatch({
            type: types.ACTIVATE_CHAT,
            payload: user.uid
        });

        // Cargar los mensajes del chat
        const response = await fetchToken(`messages/${user.uid}`);
        dispatch({
            type: types.GET_MESSAGES,
            payload: response.messages
        });

        // Mover el scroll 
        scrollToBottom();
    }

    return (
        <div 
            className={`chat_list ${ user.uid === activeChat && 'active_chat'}`}
            onClick={() => handleClick() }
        > 
            <div className="chat_people">
                <div className="chat_img">
                    <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                    />
                </div> 
                <div className="chat_ib">
                    <h5>{user.name}</h5>
                    {user.online ?   
                        <span className="text-success">Online</span> :
                        <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default SidebarChatItem;