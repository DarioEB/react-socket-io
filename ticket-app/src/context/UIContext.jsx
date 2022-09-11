import { createContext, useState } from 'react'; 
export const UIContext = createContext();

export const UIProvider = ({children}) => {

    const [hideMenu, setHideMenu] = useState(true);

    const showMenu = () => {
        setHideMenu(false);
    }

    const hiddenMenu = () => {
        setHideMenu(true);
    }

    return (
        <UIContext.Provider
            value={{
                hideMenu,
                showMenu,
                hiddenMenu
            }}
        >
            {children}
        </UIContext.Provider>
    );
}