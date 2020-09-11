import React from "react";
import Button from "@material-ui/core/Button";

import AuthService from "../../services/authService";

/**
 * Represents a button that logs in a user with
 * firebase and google
 */
const LoginButton = () => {

    /**
     * Logs in the user with google
     */
    const loginWithGoogle = async () => {
        try {
            await AuthService.loginWithGoogle();
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Renders the login button
     */
    return (
        <div style={{ textAlign: "center", marginTop: "30vh" }}>
            <Button color="secondary" onClick={loginWithGoogle}>
                Google Login
            </Button>
        </div>
    );
};

export default LoginButton;
