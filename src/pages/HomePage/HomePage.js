import React from 'react'
import classes from "./HomePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

//material UI
import {  } from '@material-ui/core';
import {  } from '@material-ui/icons';
import BodyTable from '../../components/UI/BodyTable/BodyTable';

import { Redirect,useHistory } from "react-router-dom";

function HomePage(props) {
    console.log(props)
    const homepageHistory = useHistory()
    return (
        <div className={classes.homePage}>
            {window.localStorage.getItem("token") === null && homepageHistory.replace('/login')}
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                <BodyTable 
                    header="Campaigns" 
                    buttonName = "Add New Campaign"
                    title="Campaign" 
                    url="/home/create-campagin"
                    campaigndetailURL = "/home/campaign"
                />
            </div>
        </div>
    )
}

export default HomePage;
