import React,{} from 'react'
import classes from "./SideBar.module.css"

//material UI
import { IconButton } from '@material-ui/core';
import { Close, Group, Home, TrackChanges, Warning,Menu } from '@material-ui/icons';

//react router
import {useHistory} from "react-router-dom";

//redux
import { connect } from "react-redux";
import { closesidebar } from "../../redux/actions/showsidebarAction";
import {
    homesidebar, logssidebar,
    targetinfosidebar, templatesidebar,
    usermanagementsidebar
} from "../../redux/actions/activesidebarAction";

function SideBar(props) {

    const sideBarHistory = useHistory();

    return (
        <div className={classes.sideBar__body__sideBar}
            style={{
                width : props.showsidebarReducers.sidebaropen ? "200px" : "50px"
            }}
        >
            <div className={classes.sideBar__body__sideBar__header}
            >
                <IconButton onClick={()=> props.closesidebarAction()}>
                    {props.showsidebarReducers.sidebaropen
                        ? <Close style={{ color: "white", fontSize: 30 }} />
                        : <Menu style={{ color: "white", fontSize: 30 }} />
                    }
                </IconButton>
            </div>

            {/* sidebar content */}

            <div className={[classes.sideBar__body__sideBar__content].join(" ")}>

                {/* home */}
                <div style={{
                    borderRightWidth: props.activesidebarReducers.home && "5px",
                    borderRightStyle: props.activesidebarReducers.home && "solid",
                    borderRightColor : props.activesidebarReducers.home && "black"
                }}
                    onClick={() => {
                        props.homesidebarAction()
                        sideBarHistory.push("/");
                    }}
                >
                    <Home style={{fontSize: 30}} />
                    <h1>Home</h1>
                    
                </div>

                {/* template */}
                <div
                    style={{
                        borderRightWidth: props.activesidebarReducers.template && "5px",
                        borderRightStyle: props.activesidebarReducers.template && "solid",
                        borderRightColor : props.activesidebarReducers.template && "black"
                    }}
                    onClick={() => {
                        props.templatesidebarAction();
                        sideBarHistory.push("/home/templates")
                    }}
                >
                    <Home style={{fontSize: 30}} />
                    <h1>Template</h1>
                    
                </div>

                {/* logs */}
                <div
                    style={{
                        borderRightWidth: props.activesidebarReducers.logs && "5px",
                        borderRightStyle: props.activesidebarReducers.logs && "solid",
                        borderRightColor : props.activesidebarReducers.logs && "black"
                    }}
                    onClick={() => {
                        props.logssidebarAction()
                        sideBarHistory.push("/");
                    }}
                >
                    <Warning style={{fontSize: 30}}/>
                    <h1>Logs</h1>

                </div>

                {/* targetInfo */}

                <div
                    style={{
                        borderRightWidth: props.activesidebarReducers.tragetInfo && "5px",
                        borderRightStyle: props.activesidebarReducers.tragetInfo && "solid",
                        borderRightColor : props.activesidebarReducers.tragetInfo && "black"
                    }}
                    onClick={() => {
                        props.targetinfosidebarAction()
                        sideBarHistory.push("/");
                    }}
                >
                    <TrackChanges style={{fontSize: 30}}/>
                    <h1>Traget Info</h1>
                </div>

                
                {/* usermanagement */}
                <div
                    style={{
                        borderRightWidth: props.activesidebarReducers.userManagement && "5px",
                        borderRightStyle: props.activesidebarReducers.userManagement && "solid",
                        borderRightColor : props.activesidebarReducers.userManagement && "black"
                    }}
                    onClick={() => {
                        props.usermanagementsidebarAction()
                        sideBarHistory.push("/");
                    }}
                
                >
                    <Group style={{fontSize: 30}}/>
                    <h1>UserManagement</h1>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        showsidebarReducers: state.showsidebarReducers,
        activesidebarReducers: state.activesidebarReducers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closesidebarAction: () => dispatch(closesidebar()),
        homesidebarAction: () => dispatch(homesidebar()),
        templatesidebarAction: () => dispatch(templatesidebar()),
        logssidebarAction: () => dispatch(logssidebar()),
        targetinfosidebarAction: () => dispatch(targetinfosidebar()),
        usermanagementsidebarAction: () => dispatch(usermanagementsidebar())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (SideBar);
