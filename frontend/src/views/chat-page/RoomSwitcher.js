import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import {UserContext} from '../../providers/UserProvider'
import {getRooms} from '../../services/socketService'

/**
 * Css styling
 */
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

/**
 * A element that is a selector for changing rooms
 * @param {props} props
 */
const RoomSwitcher = (props) => {
    const classes = useStyles();
    const [rooms, setRooms] = useState([]);
    const {room, changeRoom} = props;
    const {socket} = useContext(UserContext);

    /**
     * Change the room when a new room is selected
     * @param {event} e event
     */
    const handleChange = (e) => {
        e.preventDefault();
        changeRoom(e.target.value);
    }

    /**
     * Get all rooms available
     */
    useEffect(() => {
        const handleRooms = async (rooms) => {
            setRooms(rooms);
            changeRoom(rooms[0]);
        }
        getRooms(socket, handleRooms);
    }, [])

    /**
     * Generate the selector
     */
    return (
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">room</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={room}
          onChange={handleChange}
        >
            {rooms.map(room => <MenuItem value={room} key={room}>{room}</MenuItem>)}
        </Select>
      </FormControl>
    )
}

export default RoomSwitcher
