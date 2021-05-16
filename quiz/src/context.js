import React, { useContext, useState } from "react";
import axios from "axios";

const table = {
    sports: 21,
    history: 23,
    politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [error, setError] = useState(false);
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: "sports",
        difficulty: "easy",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchQuestions = async (url) => {
        setLoading(true);
        setWaiting(false);
        const response = await axios.get(url).catch((err) => console.log(err));
        if (response) {
            const data = response.data;
            if (data.response_code === 0) {
                setQuestions(data.results);
                setLoading(false);
                setWaiting(false);
                setError(false);
            } else {
                setWaiting(true);
                setError(true);
            }
        } else {
            setWaiting(false);
        }
    };

    const checkAnswer = (value) => {
        if(value){
            setCorrect((oldCorrect)=>{
                return oldCorrect + 1;
            });
        }
        nextQuestion();
    }

    const nextQuestion = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1;
            if(index > questions.length - 1){
                openModal();
                return 0;
            }
            return index;
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModel = () => {
        setWaiting(true);
        setCorrect(0);
        setIsModalOpen(false);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuiz({...quiz, [name]: value});
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        const { amount, category, difficulty} = quiz;
        const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
        fetchQuestions(url);
    }

    return (
        <AppContext.Provider
            value={{
                waiting,
                loading,
                questions,
                index,
                correct,
                error,
                isModalOpen,
                quiz,
                nextQuestion,
                checkAnswer,
                closeModel,
                handleChange,
                handleSubmit
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
