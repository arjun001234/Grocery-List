import { Typography } from '@material-ui/core';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles( theme => ({
    root: {
        backgroundColor: "#ebedee",
        display: "flex",
        alignItems: "center",
        width: 414,
        height: 30,
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            width: 314
        }
    },
    textstyle: {
        flexGrow: 1,
        marginLeft: 10
    },
}))

export default function Items({id, name, remove, copy}) {

    const classes = styles();

    return (
        <div className={classes.root}>
            <Typography className={classes.textstyle}>{name}</Typography>
            <IconButton onClick={copy}>
                <FileCopyIcon fontSize="small" style={{color: "green"}}/>
            </IconButton>
            <IconButton onClick={remove}>
                <DeleteIcon fontSize="small" style={{color: "red"}} />
            </IconButton>
        </div>
    )
}