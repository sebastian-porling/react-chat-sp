import React from "react";
import LoginButton from "./LoginButton"
import "./StartPage.css";

/**
 * A starting page with a login button
 */
const StartPage = () => {

    /**
     * Generates a start page with a welcome message and a login button
     */
    return (
        <>
            <h1>Welcome to the react-chat</h1>
            <h3>Login using your google account to start chatting...</h3>
            <LoginButton />
        </>
    );
};

export default StartPage;
