import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import colors from "../../config/colors";

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
 * A selector for user color
 * @param {props} param0 taking in the user color and change color function
 */
const UserColorSelector = ({ color, changeColor }) => {
    const classes = useStyles();

    /**
     * Change the color when a new color is selected
     * @param {event} e event
     */
    const handleChange = (e) => {
        e.preventDefault();
        changeColor(e.target.value);
    };

    /**
     * Generates the color selector
     */
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">color</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                style={{ color: colors[color] }}
                onChange={handleChange}
            >
                {Object.keys(colors).map((key) => (
                    <MenuItem
                        style={{ color: colors[key] }}
                        value={key}
                        key={key}
                    >
                        {key}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default UserColorSelector;
