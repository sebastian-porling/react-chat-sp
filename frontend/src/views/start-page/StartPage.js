import React from 'react';
import LoginComponent from './LoginComponent'
import './StartPage.css'


const StartPage = () => {

    return (
        <>
            <h1>Welcome to the react-chat</h1>
            <h3>Login using your google account to start chatting...</h3>
            <LoginComponent />
        </>
    )
}

export default StartPage
