import React from 'react'
import classes from "./SideBar.module.css"

//material UI
import { IconButton } from '@material-ui/core';
import { Close, Group, Home, TrackChanges, Warning,Menu } from '@material-ui/icons';

//react router
import {useHistory} from "react-router-dom";

//redux
import { connect } from "react-redux";
import { closesidebar } from "../../redux/actions/showsidebarAction";

function SideBar(props) {
    const sideBarHistory = useHistory();
    return (
        <div className={classes.sideBar__body__sideBar}
            style={{
                width : props.showsidebarReducers.sidebaropen ? "200px" : "50px"
            }}
        >
            <div className={classes.sideBar__body__sideBar__header}>
                <IconButton onClick={()=> props.closesidebarAction()}>
                    {props.showsidebarReducers.sidebaropen
                        ? <Close style={{ color: "white", fontSize: 30 }} />
                        : <Menu style={{ color: "white", fontSize: 30 }} />
                    }
                </IconButton>
            </div>

            <div className={classes.sideBar__body__sideBar__content}>
                <div onClick={()=> sideBarHistory.push("/")}>
                    <Home style={{fontSize: 30}} />
                    <h1>Home</h1>
                    
                </div>

                <div onClick={() => sideBarHistory.push("/home/templates")}>
                    <Home style={{fontSize: 30}} />
                    <h1>Template</h1>
                    
                </div>

                <div>
                    <Warning style={{fontSize: 30}}/>

                    <h1>Logs</h1>
                    
                </div>

                <div>
                    <TrackChanges style={{fontSize: 30}}/>
                    <h1>Traget Info</h1>
                </div>

                <div>
                    <Group style={{fontSize: 30}}/>
                    <h1>UserManagement</h1>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        showsidebarReducers: state.showsidebarReducers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closesidebarAction: () => dispatch(closesidebar()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (SideBar);
