import React, { useContext } from "react";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=`;

const AppContext = React.createContext();

const AppProvider = ({ children })=> {
    return <AppContext.Provider value='hello'>{ children }</AppContext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext };
