import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: "" });
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("sup");

    const fetchMovie = async (url) => {
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.Response === "True") {
                // find some movies
                setMovies(data.Search);
                setError({ show: false, msg: "" });
            } else {
                // cannot find any movie
                setError({ show: true, msg: data.Error });
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovie(`${API_ENDPOINT}&s=${query}`);
    }, [query]);

    return (
        <AppContext.Provider
            value={{ isLoading, error, movies, query, setQuery }} // setQuery will be used in the search form
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, AppContext };
