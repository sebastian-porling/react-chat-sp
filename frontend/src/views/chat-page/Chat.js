import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatMessage from './ChatMessage';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '70vh',
      maxWidth: '40ch',
      overflowY: 'scroll',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const Chat = ({room, messages}) => {
    const classes = useStyles();
    const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);
    return (
        <List className={classes.root}>
            {messages.map(message => <ChatMessage key={message.time} message={message.message} user={message.user} time={message.time}/>)}
            <div ref={messagesEndRef} />
        </List>
    )
}

export default Chat
