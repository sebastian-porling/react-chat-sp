import React from 'react';
import Button from '@material-ui/core/Button'
import AuthService from '../../services/authService'

const LoginComponent = () => {

    const loginWithGoogle = async () => {
        try {
            await AuthService.loginWithGoogle();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{textAlign: "center", marginTop: "30vh"}}>
            <Button color="secondary" onClick={loginWithGoogle}>Google Login</Button>
        </div>

    )
}

export default LoginComponent
