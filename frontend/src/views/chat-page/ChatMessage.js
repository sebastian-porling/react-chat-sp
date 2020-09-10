import React from 'react';
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

const ChatMessage = ({message, user, time}) => {

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={user.picture} />
            </ListItemAvatar>
            <ListItemText
            primary={user.name}
            secondary={message}
            />
        </ListItem>
    )
}

export default ChatMessage
