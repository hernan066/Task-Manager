import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;

    // Methods
    closeSideMenu: () => void;
    openSideMenu: () => void;
    setIsAddingEntry: (isAdding: boolean) => void;
   
}


export const UIContext = createContext({} as ContextProps );

 