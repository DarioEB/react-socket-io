import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import {AuthContext} from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { types } from '../types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom'
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { 
        socket, 
        online, 
        connectSocket, 
        disconnectSocket 
    } = useSocket(import.meta.env.VITE_BACKEND_URL);
    const  { auth } = useContext(AuthContext);

    const { dispatch } = useContext(ChatContext);
    
    useEffect( () => {
        if(auth.logged) {
            connectSocket();
        }
    }, [auth, connectSocket]);

    useEffect( () => {
        if(!auth.logged) {
            disconnectSocket();
        }
    }, [auth, disconnectSocket]);

    // Escuchar los cambios en los usuarios conectados
    useEffect( () => {
        socket?.on('user-list', users => { 
            dispatch({
                type: types.UPLOADED_USERS,
                payload: users
            })
        })
    }, [socket, dispatch]);

    useEffect( () => {
        socket?.on('private-message', (message) => {
            dispatch({
                type: types.NEW_MESSAGE,
                payload: message
            });
            scrollToBottomAnimated('messages');
        })
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}