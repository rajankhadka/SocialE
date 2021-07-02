import React, { useEffect, useState } from 'react'
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
import { userapi } from '../../api/userapi/user';



function UserManagementPage(props) {

   const [allUser,setAllUser] = useState([]);

   useEffect(()=>{
        fetch(userapi.userlist,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(allUserData => {
                console.log(allUserData)
                setAllUser([...allUserData])
            })
            .catch(err => console.log(err));
   },[])

    return (

        <TokenVerification>
            <div className={classes.usermanagementPage}>
                <Header />
                <div className={classes.usermanagementPage__body}>
                    <SideBar />

                    <SpecificCampaignDetailProvider>
                        <BodyTable
                            allUser = {allUser}
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
