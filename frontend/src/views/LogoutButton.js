import React from "react";
import Button from "@material-ui/core/Button";

import AuthService from "../services/authService";

/**
 * A logout button
 */
const LogoutButton = () => {

    /**
     * Logs out the user using firebase
     */
    const logout = async () => {
        try {
            AuthService.logout();
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Renders the button to be in the upper right corner
     */
    return (
        <div
            style={{
                position: "absolute",
                top: "2px",
                right: "10px",
                zIndex: "1000",
            }}
        >
            <Button color="secondary" onClick={logout}>
                Logout
            </Button>
        </div>
    );
};

export default LogoutButton;
