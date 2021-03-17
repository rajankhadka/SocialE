import React from 'react'
import classes from "./Campaign.module.css";

//importing components
import Header from '../../../components/Header/Header';
import SideBar from '../../../components/SideBar/SideBar';
import BodyTable from '../../../components/UI/BodyTable/BodyTable';

function Campaign(props) {
    return (
        <div className={classes.homePage}>
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                
            </div>
        </div>
    )
}

export default Campaign;
