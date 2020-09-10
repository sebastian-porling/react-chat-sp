import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Terminal } from "react-window-ui";
import StartPage from "./views/start-page/StartPage";
import ChatPage from "./views/chat-page/ChatPage";
import { UserContext } from "./providers/UserProvider";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./App.css";

function App() {
    const {user} = useContext(UserContext);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(() =>
            createMuiTheme({
            palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#666666",
            }}
        >
            <CssBaseline />
            <Terminal
                background="#232537"
                topbarTitle={user ? user.displayName : "react-chat"}
                barHeight="40px"
                style={{
                    margin: "2vh",
                    maxWidth: "1200px",
                    width: "100%",
                    height: "96vh",
                    fontFamily: "hack"
                }}
            ><ThemeProvider theme={theme}>
                {user ? <ChatPage /> : <StartPage />}
                </ThemeProvider>
            </Terminal>
        </div>
    );
}

export default App;
