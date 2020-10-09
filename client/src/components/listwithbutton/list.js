import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Fab from '@material-ui/core/Fab';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';




const List = ({ task, handleClick, list }) => {
    console.log(list)
    const [loading, setLoading] = useState(false);

    const handleIconClick = (e, id) => {
        setLoading(true)
        handleClick(e, id)
    }
    return (
        <ListItem className={list}>
            <ListItemText>
                <Typography variant="h5">{task.description}</Typography>
            </ListItemText>
            <Fab
                size="small"
                color="primary"
                aria-label="delete"
                onClick={(e) => handleIconClick(e, task._id)}
            >
                {loading ? <CircularProgress size={25} color="secondary" /> : <DeleteTwoToneIcon />}
            </Fab>
        </ListItem>
    )
}

export default List



