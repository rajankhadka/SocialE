import React,{useState,useEffect} from 'react'
import classes from "./HomePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

//material UI
import {  } from '@material-ui/core';
import {  } from '@material-ui/icons';
import BodyTable from '../../components/UI/BodyTable/BodyTable';

import { Redirect,useHistory } from "react-router-dom";
import TargetAudienceGroup from '../../components/TargetAudienceGroup/TargetAudienceGroup';

function HomePage(props) {

    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/campaign/get/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.payload);
                setCampaign(data.payload);
            })
            .catch(err => console.log(err));
        
    }, [])

    //show create group
    const [showGroup, setShowGroup] = useState(false);

    //trigger on the show group
    const showGroupONHandler = () => {
        console.log("clicked!!!")
        setShowGroup(true);
    }

    //trigger off the show group
    const showGroupOFFhandler = () => {
        setShowGroup(false);
    }

    const homepageHistory = useHistory()
    return (
        <div className={classes.homePage}>
            {window.localStorage.getItem("token") === null && homepageHistory.replace('/login')}
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                <BodyTable 
                    header="Campaigns" 
                    buttonName="Add New Campaign"
                    groupName="Create Group"
                    title="Campaign" 
                    url="/home/create-campagin"
                    campaigndetailURL="/home/campaign"
                    data={campaign}
                    showGroup={showGroup}
                    showGroupONHandler={showGroupONHandler}
                />

                {
                    showGroup
                        ?
                        <TargetAudienceGroup
                            showGroupOFFhandler={showGroupOFFhandler}
                        />
                        :
                            null
                }
            </div>
        </div>
    )
}

export default HomePage;
