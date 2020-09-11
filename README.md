# react-chat

This solution is made by [Sebastian Porling](https://github.org/sebastian-porling).

### Frontend

I have been using react for the frontend utilizing material.ui for styling.

more stuff...

### Backend

I used Node.js, express and Socket.io for the backend.
I create multiple handlers and take care of authentication before the conenction with the socket has been sstablished.
I use Firebase for checking the JWT token.

| endpoint   | functionality                         | comments                                                  |
| ---------- | ------------------------------------- | --------------------------------------------------------- |
| join       | Adds user to given chatroom name      | If room exists we add it using the ChatroomHandler        |
| leave      | Removes user from given chatroom name | If room exists we remove the user from the room           |
| message    | Broadcasts message in chatroom        | If room exists we will broadcast the message to that room |
| chat rooms  | Returns all chatroom names            | ----                                                      |
| users      | Returns all logged in users           | Empty array if no users                                  |
| disconnect | Handles disconnect on socket          | Removes the user from ClientHandler and all chat rooms     |
| error      | All errors handled here               | If something would go wrong                               |

|class|functionality|
|----|----|----|
|server|Sets up the express/http server and adds the sockets|
|socket|Sets up authentication and handlers for endpoints|
|fireBaseJwtAuthentication|Authenticates the JWT token with firebase|
|firebaseAdmin|Initializes the firebase admin app|
|ChatHandlers|Handles all functionality of the socket|
|Chatroom|Represents a chatroom with users and chat history|
|ChatroomManager|Handles all chat rooms|
|ClientManager|Handles all client sockets|
