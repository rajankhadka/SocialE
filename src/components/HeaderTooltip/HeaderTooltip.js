import React from 'react'
import classes from "./HeaderTooltip.module.css";

//material UI
import { AccountCircle, ExitToApp, Settings } from '@material-ui/icons';

function HeaderTooltip(props) {
    return (
        <div className={classes.headerTooltip__content}>
            <p> <AccountCircle /> User Profile</p>
            <p> <Settings /> Setting</p>
            <p> <ExitToApp /> Logout</p>
        </div>
    )
}

export default HeaderTooltip
