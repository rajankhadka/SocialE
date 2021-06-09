import React from 'react'
import classes from "./Model.module.css";

function Model(props) {
    return (
        <div className={classes.Model}>
            {props.children}
        </div>
    )
}

export default Model;
