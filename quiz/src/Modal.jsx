import React from "react";

import { useGlobalContext } from "./context";

const Modal = () => {
    const {
        isModalOpen,
        closeModel,
        correct,
        questions
    } = useGlobalContext();
    return (
    <div className={isModalOpen ? "modal-container isOpen" : "modal-container"}>
        <div className="modal-content">
            <h2>congrats!</h2>
            <p>You answered {((correct/questions.length)*100).toFixed(2)}% of questions correctly!</p>
            <button className="close-btn" onClick={closeModel}>play again</button>
        </div>
    </div>);
}

export default Modal;