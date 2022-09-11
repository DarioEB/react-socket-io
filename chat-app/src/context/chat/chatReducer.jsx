import { types } from "../../types";

const chatReducer = (state, action) => { 
    
    switch(action.type) { 
        case types.UPLOADED_USERS:
            return {
                ...state,
                users: [ ...action.payload ]
            }
        case types.ACTIVATE_CHAT:

            if(state.activeChat === action.payload) return state

            return {
                ...state,
                activeChat: action.payload,
                messages: []
            }
        case types.NEW_MESSAGE:
            if( state.activeChat === action.payload.from ||
                state.activeChat === action.payload.to ) {
                return {
                    ...state,
                    messages: [...state.messages, action.payload]
                }
            } else {
                return state;
            }
        case types.GET_MESSAGES:
            return {
                ...state,
                messages: [...action.payload]
            }
        case types.CLEAN_STATES:
            return {
                uid: '',
                activeChat: null,
                users: [],
                messages: []
            }
        default: 
            return state;
    }
}

export default chatReducer;