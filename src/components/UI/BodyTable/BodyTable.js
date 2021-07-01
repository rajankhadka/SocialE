import React from "react";
import classes from "./BodyTable.module.css";

//material UI

//importing components
import HomePageBodyHeader from "../../HomePageBodyHeader/HomePageBodyHeader";

//redux
import { connect } from "react-redux";

//react router 
import { useHistory } from "react-router-dom";
import BodyTableBody from "./BodyTableBody";
import CreateTemplate from "../CreateTemplate/CreateTemplate";

const BodyTable = (props) => {
    const bodytableHistory = useHistory();

    const routeURLHandler = () => {
        bodytableHistory.push(props.campaigndetailURL);
    }

    let bodyTable = null;

    if (props.header === 'Templates' && props.templatePageToggle === "view") {
        bodyTable = (
            <BodyTableBody
                title={props.title}
                routeURLHandler={routeURLHandler}
                campaigndetailURL={props.campaigndetailURL}
            />
        );
    } else if (props.header === 'Templates' && props.templatePageToggle === "create") {
        bodyTable = <CreateTemplate />;
    } else if (props.header === "Target Audience Groups") {
        bodyTable = null;
    }else if(props.header === "User Management"){
        <BodyTableBody 
            
        />
    }
    
    else {
        bodyTable = (
            <BodyTableBody
                // edit campaign
                campaignEditTrigger={props.campaignEditTrigger}
                campaignEditTriggerHanlderOFF={props.campaignEditTriggerHanlderOFF}
                campaignEditTriggerHanlderON={props.campaignEditTriggerHanlderON}

                // delete campaign
                campaignDeleteTrigger={props.campaignDeleteTrigger}
                campaignDeleteTriggerHandlerOFF={props.campaignDeleteTriggerHandlerOFF}
                campaignDeleteTriggerHandlerON={props.campaignDeleteTriggerHandlerON}

                data={props.data}
                title={props.title}
                routeURLHandler={routeURLHandler}
                campaigndetailURL={props.campaigndetailURL}
            />
        );
    }

    return(
        <div className={classes.homePage__body__body}
            style={{
                zIndex: !props.showtooltipReducers.bodyzIndex ? "-1" : "1" 
            }}
        >
            <HomePageBodyHeader 

                //header select 
                selectCampaign={props.selectCampaign}
                selectCampaignValueHandler={props.selectCampaignValueHandler}

                header={props.header} 
                buttonName={props.buttonName}
                groupName={props.groupName}
                title={props.title}
                url={props.url}
                showGroup={props.showGroup}
                showGroupONHandler={props.showGroupONHandler}
                showAllGroup={props.showAllGroup}
                showONAllGroupHandler={props.showONAllGroupHandler}
                showcreateGroupONhandler={props.showcreateGroupONhandler}
            />

            {bodyTable}
           
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showtooltipReducers: state.showtooltipReducers,
        templatePageToggle: state.templatePageToggleReducers.templatePageToggle
    }
}

export default connect(mapStateToProps, undefined)(BodyTable);