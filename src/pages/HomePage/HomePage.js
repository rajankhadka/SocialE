import React from 'react'
import classes from "./HomePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';


//material UI
import { Button, IconButton, TextField } from '@material-ui/core';
import { Add, Edit, Search, Send, Delete } from '@material-ui/icons';
import BodyTable from '../../components/UI/BodyTable/BodyTable';



function HomePage(props) {
    return (
        <div className={classes.homePage}>
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                <BodyTable />
            </div>
        </div>
    )
}

export default HomePage;
