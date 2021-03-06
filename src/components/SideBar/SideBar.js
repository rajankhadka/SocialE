import React from 'react'
import classes from "./SideBar.module.css"

//material UI
import { IconButton } from '@material-ui/core';
import { Close, Group, Home, TrackChanges, Warning } from '@material-ui/icons';

//react router
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

function SideBar(props) {
    const sideBarHistory = useHistory();
    return (
        <div className={classes.sideBar__body__sideBar}>
            <div className={classes.sideBar__body__sideBar__header}>
                <IconButton>
                    <Close  style={{color:"white" ,fontSize: 30}}/>
                </IconButton>
            </div>

            <div className={classes.sideBar__body__sideBar__content}>
                <div onClick={()=> sideBarHistory.push("/")}>
                    <Home style={{fontSize: 30}} />
                    <h1>Home</h1>
                    
                </div>

                <div onClick={() => sideBarHistory.push("/home/templates")}>
                    <Home style={{fontSize: 30}} />
                    <h1>Template</h1>
                    
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
