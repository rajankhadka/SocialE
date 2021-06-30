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
import { SpecificCampaignDetailProvider } from '../../contextAPI/SpecificCampaignDetail/SpecificCampaignDetailContext';
import TokenVerification from '../../hoc/TokenVerification';



function UserManagementPage(props) {
    return (

        <TokenVerification>
            <div className={classes.usermanagementPage}>
                <Header />
                <div className={classes.usermanagementPage__body}>
                    <SideBar />

                    <SpecificCampaignDetailProvider>
                        <BodyTable 
                            header="User Management" 
                            buttonName = "Create User"
                            title="User" 
                            url="/home/create-user"
                        />
                    </SpecificCampaignDetailProvider>
                </div>
            </div>
        </TokenVerification>
    )
}

export default UserManagementPage;
