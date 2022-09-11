import { useEffect, useContext } from 'react';
import { UIContext } from '../context/UIContext';

export const useHiddenMenu = ( hide ) => {

    const { showMenu, hiddenMenu } = useContext(UIContext)

    useEffect( () => {
        if(hide) {
            hiddenMenu();
        } else {
            showMenu();
        }
    }, [hide]); 
}