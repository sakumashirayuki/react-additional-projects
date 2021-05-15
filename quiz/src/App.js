import React from "react";

import { useGlobalContext } from "./context";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

function App() {
    const {
        waiting,
        loading,
        questions,
        index,
        correct,
        nextQuestion,
        checkAnswer,
    } = useGlobalContext();
    if (waiting) {
        return <SetupForm />;
    }
    if (loading) {
        return <Loading />;
    }
    const { question, correct_answer, incorrect_answers } = questions[index];
    const answers = [...incorrect_answers, correct_answer];

    const createMarkup = (html) => {
        return { __html: html };
    };
    return (
        <main>
            {<Modal />}
            <div className="quiz">
                <p className="correct-answers">
                    correct answers : {correct}/{index}
                </p>
                <article className="container">
                    <h2 dangerouslySetInnerHTML={createMarkup(question)} />
                    <div className="btn-container">
                        {answers.map((answer, index) => {
                            return (
                                <button
                                    key={index}
                                    className="answer-btn"
                                    onClick={()=>{checkAnswer(correct_answer === answer)}}
                                    dangerouslySetInnerHTML={createMarkup(
                                        answer
                                    )}
                                />
                            );
                        })}
                    </div>
                </article>
                <button className="next-question" onClick={nextQuestion}>
                    next question
                </button>
            </div>
        </main>
    );
}

export default App;
