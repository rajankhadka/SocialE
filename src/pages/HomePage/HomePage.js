import React from 'react'
import classes from "./HomePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import CreateCampaginPage from '../CreateCampaginPage/CreateCampaginPage';

//material UI
import { Button, IconButton, TextField } from '@material-ui/core';
import { Add, Edit, Search, Send, Delete } from '@material-ui/icons';
import BodyTable from '../../components/UI/BodyTable/BodyTable';

//react router 
import {Route,Switch} from 'react-router-dom';



function HomePage(props) {
    console.log(props)
    return (
        <div className={classes.homePage}>
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                <BodyTable 
                    header="Campaigns" 
                    buttonName = "Add New Campaign"
                     title="Campaign" 
                     url="/home/create-campagin"
                />
                
            </div>
        </div>
    )
}

export default HomePage;
