import React from 'react'
import classes from "./HomePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

//material UI
import { IconButton } from '@material-ui/core';
import { Close, Group, Home, TrackChanges, Warning } from '@material-ui/icons';


function HomePage(props) {
    return (
        <div className={classes.homePage}>
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />

                <div className={classes.homePage__body__body}>
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage;
