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
import ShowGroup from '../../components/TargetAudienceGroup/ShowGroup/ShowGroup';
import { SpecificCampaignDetailProvider } from '../../contextAPI/SpecificCampaignDetail/SpecificCampaignDetailContext';
import { campaignApi } from '../../api/campaign/campaign';

function HomePage(props) {

    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        fetch(campaignApi.campaigngetlist, {
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
    const [showAllGroup, setShowAllGroup] = useState(false);

    //trigger on the show group
    const showGroupONHandler = () => {
        console.log("clicked!!!")
        setShowGroup(true);
    }

    //trigger off the show group
    const showGroupOFFhandler = () => {
        setShowGroup(false);
    }

    //trigger on the show all group
    const showONAllGroupHandler = () => {
        console.log("show all group!!!");
        setShowAllGroup(true);
    };

    //trigger off the show all group
    const showOFFAllGroupHandler = () => setShowAllGroup(false);

    const homepageHistory = useHistory()
    return (
        <div className={classes.homePage}>
            {window.localStorage.getItem("token") === null && homepageHistory.replace('/login')}
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />

                <SpecificCampaignDetailProvider>

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
                        showAllGroup="All Groups"
                        showONAllGroupHandler={showONAllGroupHandler}
                    />
                </SpecificCampaignDetailProvider>
                

                {
                    showGroup
                        ?
                        <TargetAudienceGroup
                            showGroupOFFhandler={showGroupOFFhandler}
                        />
                        :
                            null
                }

                {
                    showAllGroup
                        ?
                        <ShowGroup
                            showOFFAllGroupHandler={showOFFAllGroupHandler}
                        />
                        :
                        null
                }
            </div>
        </div>
    )
}

export default HomePage;
