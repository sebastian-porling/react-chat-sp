import React, { Component, createContext } from "react";
import { auth } from "../config/init-firebase";
import { initSocketIO } from "../services/socketService";
import AuthService from "../services/authService";

/**
 * Create a usercontext with the state of user and socket
 */
export const UserContext = createContext({ user: null, socket: null });

/**
 * Provides the state of the user and socket
 * Adds a listener on the user if the state changes and adds a socket
 */
class UserProvider extends Component {
    state = {
        user: null,
        socket: null,
    };

    /**
     * When component mounts,
     * Handle changes in current user.
     */
    componentDidMount = () => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                this.setState({ user });
                return;
            }
            try {
                const userToken = await AuthService.getUserToken();
                const socket = initSocketIO(userToken);
                this.setState({ user, socket });
            } catch (error) {
                this.setState({ user: null, socket: null });
                console.log(error);
            }
        });
    };

    /**
     * Render the UserContext and add the state and children.
     */
    render() {
        return (
            <UserContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;
