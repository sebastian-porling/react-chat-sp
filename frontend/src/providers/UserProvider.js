import React, { Component, createContext } from "react";
import { auth } from "../init-firebase";
import { initSocketIO } from '../services/socketService'
import AuthService from '../services/authService';

export const UserContext = createContext({ user: null, users: [] });

class UserProvider extends Component {
  state = {
    user: null,
    socket: null,
    users: []
  };

  componentDidMount = () => {
    auth.onAuthStateChanged( async user => {
        console.log(user)
        if(!user) {
            this.setState({user});
            return;
        }
        try {
            const userToken = await AuthService.getUserToken();
            const socket = initSocketIO(userToken);
            this.setState({ user, socket });
            socket.on('users', (users) => {
                this.setState({ user: this.state.user, socket: this.state.socket, users});
            })
        } catch (error) {
            this.setState({user: null, users: null, socket: null});
            console.log(error)
        }

    });
  };

  render() {
    return (
      <UserContext.Provider value={{...this.state}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
