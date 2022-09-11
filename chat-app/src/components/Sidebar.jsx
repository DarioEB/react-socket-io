import SidebarChatItem from './SidebarChatItem';
import { ChatContext } from '../context/chat/ChatContext';
import {AuthContext} from '../auth/AuthContext';
import { useContext } from 'react';
const Sidebar = () => {
 
    const { chatState} = useContext(ChatContext);

    const { auth } = useContext(AuthContext);

    const { uid } = auth;


    return (
        <div className="inbox_chat">
            {
                chatState.users
                    .filter( user => user.uid !== uid)
                    .map( (user, index) => ( 
                    <SidebarChatItem 
                        key={index}
                        user={user}
                    />
                ))
            }

            <div className="extra_space"></div>

        </div>
    )
}

export default Sidebar;