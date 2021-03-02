import React from 'react'
import classes from "./SideBar.module.css"

//material UI
import { IconButton } from '@material-ui/core';
import { Close, Group, Home, TrackChanges, Warning } from '@material-ui/icons';

function SideBar(props) {
    return (
        <div className={classes.sideBar__body__sideBar}>
            <div className={classes.sideBar__body__sideBar__header}>
                <IconButton>
                    <Close  style={{color:"white" ,fontSize: 30}}/>
                </IconButton>
            </div>

            <div className={classes.sideBar__body__sideBar__content}>
                <div>
                    <Home style={{fontSize: 30}} />
                    <h1>Home</h1>
                </div>

                <div>
                    <Warning style={{fontSize: 30}}/>
                    <h1>Logs</h1>
                </div>

                <div>
                    <TrackChanges style={{fontSize: 30}}/>
                    <h1>Traget Info</h1>
                </div>

                <div>
                    <Group style={{fontSize: 30}}/>
                    <h1>UserManagement</h1>
                </div>
            </div>

        </div>
    )
}

export default SideBar;
