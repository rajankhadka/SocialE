import React from 'react'
import classes from "./UserManagementPage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

//material UI
import {  } from '@material-ui/core';
import { } from '@material-ui/icons';
import BodyTable from '../../components/UI/BodyTable/BodyTable';

//react router 
import {} from 'react-router-dom';



function UserManagementPage(props) {
    return (
        <div className={classes.usermanagementPage}>
            <Header />
            <div className={classes.usermanagementPage__body}>
                <SideBar />
                <BodyTable 
                    header="User Management" 
                    buttonName = "Create User"
                     title="User" 
                     url="/home/create-user"
                />
                
            </div>
        </div>
    )
}

export default UserManagementPage;
