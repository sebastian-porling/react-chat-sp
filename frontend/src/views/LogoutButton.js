import React from 'react';
import AuthService from '../services/authService';
import Button from '@material-ui/core/Button'

const LogoutButton = () => {

    const logout = async () => {
        try {
            AuthService.logout();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{position: "absolute", top: "2px", right: "10px", zIndex: "1000"}}>
            <Button color="secondary" onClick={logout}>Logout</Button>
        </div>
    )
}

export default LogoutButton
