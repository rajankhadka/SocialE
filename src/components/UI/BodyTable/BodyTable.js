import React from "react";
import classes from "./BodyTable.module.css";

//material UI
import {  IconButton,  } from '@material-ui/core';
import {  Edit, Send, Delete } from '@material-ui/icons';

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
    console.log("bodytable", props);

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
    } else {
        bodyTable = (
            <BodyTableBody
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
                header={props.header} 
                buttonName={props.buttonName}
                groupName={props.groupName}
                title={props.title}
                url={props.url}
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