import { createContext, useCallback, useContext, useState } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchNoToken, fetchToken } from "../helpers/fetch";
import { types } from "../types";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(initialState);

    const { dispatch } = useContext(ChatContext); 

    const login = async (email, password) => {
        const response = await fetchNoToken('login', {email, password}, 'POST');
        
        if(response.ok) {
            localStorage.setItem('token-chat', response.token);
            const { user } = response;
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
        }

        return response.ok;
    }

    const register = async (name, email, password) => {
        const response = await fetchNoToken('login/new', {name, email, password}, 'POST');
        console.log(response);
        if(response.ok) {
            localStorage.setItem('token-chat', response.token);
            const { user } = response;
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
            
        } else {
            return {
                ok: response.ok,
                message: response.msg
            }
        }

        return {ok: response.ok, message: response.msg};
    }

    const verifyToken = useCallback( async () => {
        const token = localStorage.getItem('token-chat');

        if(!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;
        } 
        
        const response = await fetchToken('login/renew');
        if(response.ok) {
            localStorage.setItem('token-chat', response.token);
            const { user } = response;
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email
            });
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });
        }

        return response.ok;
    }, []);

    const logout = () => {
        localStorage.removeItem('token-chat');

        dispatch({type: types.CLEAN_STATES})

        setAuth({
            uid: null,
            checking: false,
            logged: false,
            name: null,
            email: null
        });
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                register,
                verifyToken,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}