import React,{useState,useEffect} from 'react'
import classes from "./HomePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

//material UI
import {  } from '@material-ui/core';
import {  } from '@material-ui/icons';
import BodyTable from '../../components/UI/BodyTable/BodyTable';

import { useHistory } from "react-router-dom";
import TargetAudienceGroup from '../../components/TargetAudienceGroup/TargetAudienceGroup';
import ShowGroup from '../../components/TargetAudienceGroup/ShowGroup/ShowGroup';
import { SpecificCampaignDetailProvider } from '../../contextAPI/SpecificCampaignDetail/SpecificCampaignDetailContext';
import { campaignApi } from '../../api/campaign/campaign';
import { signinApi } from '../../api/signin/signin';
import ErrorBoundary from '../../hoc/ErrorBoundary';
import TokenVerification from '../../hoc/TokenVerification';


//token and user
const token = window.localStorage.getItem('token');
const user = window.localStorage.getItem('user');

function HomePage(props) {

    const [campaign, setCampaign] = useState([]);

    //heade part to select only and all campaign list
    const [selectCampaign, setSelectCampaign] = useState('only');

    const selectCampaignValueHandler = (event) =>{
        setSelectCampaign(event.target.value);
    }

    //edit campaigntrigger
    const [campaignEditTrigger, setCampaignEditTrigger] = useState(false);

    //edit campaigntrigger handler
    const campaignEditTriggerHanlderOFF = () => setCampaignEditTrigger(false);
    const campaignEditTriggerHanlderON = () => setCampaignEditTrigger(true);

    //delete campaigntrigger
    const [campaignDeleteTrigger, setCampaignDeleteTrigger] = useState(false);

    //delete campaigntrigger handler
    const campaignDeleteTriggerHandlerOFF = () => setCampaignDeleteTrigger(false);
    const campaignDeleteTriggerHandlerON = () => setCampaignDeleteTrigger(true);

    useEffect(() => {
        console.log("select campaign changed!!!")
        console.log(selectCampaign)

        //if campaign value is only specific individual user
        if(selectCampaign === 'only'){  
            fetch(campaignApi.campaigngetlist, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if(response.status === 401) throw new Error("Session Expried")
                   return response.json()
                })
                .then(data => {
                    
                    setCampaign(data.payload);
                })
                .catch(err => console.log(err));
        }else if(selectCampaign === 'all'){
            fetch(campaignApi.campaignallretrive, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if(response.status === 401) throw new Error("Session Expried")
                   return response.json()
                })
                .then(data => {
                    
                    setCampaign(data);
                })
                .catch(err => console.log(err));
        }
        
    }, [campaignEditTrigger,campaignDeleteTrigger,selectCampaign]);

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

    const homepageHistory = useHistory();

    //checking and verifying token

    useEffect(()=>{
        
        fetch(signinApi.tokenverification,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${window.localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                token:window.localStorage.getItem('token'),
                username:window.localStorage.getItem('user')
            })
        })
            .then(res => {
                if(res.status === 200){
                    setErrorOccured(false);
                    return res.json()
                }else{
                    setErrorOccured(true);
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                }
                
            })
            .catch(err => console.log(err));
        
        return ()=>{
            setErrorOccured(false);
        }
    },[]);

    const [errorOccured, setErrorOccured] = useState(false)
    return (
        <TokenVerification>
            <div className={classes.homePage}>
                {(window.localStorage.getItem("token") === null || errorOccured) && homepageHistory.replace('/login')}
                <Header />
                <div className={classes.homePage__body}>
                    <SideBar />

                    <SpecificCampaignDetailProvider>

                        <BodyTable
                            
                            //header
                            selectCampaign={selectCampaign}
                            selectCampaignValueHandler={selectCampaignValueHandler}

                            // edit campaign
                            campaignEditTrigger={campaignEditTrigger}
                            campaignEditTriggerHanlderOFF={campaignEditTriggerHanlderOFF}
                            campaignEditTriggerHanlderON={campaignEditTriggerHanlderON}

                            // delete campaign
                            campaignDeleteTrigger={campaignDeleteTrigger}
                            campaignDeleteTriggerHandlerOFF={campaignDeleteTriggerHandlerOFF}
                            campaignDeleteTriggerHandlerON={campaignDeleteTriggerHandlerON}
                            
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
        </TokenVerification>
    )
}

export default HomePage;
